import { memo, useEffect, useState } from "react";
import { createStore, useStore } from "react-concurrent-store";
import { Card, Chip, createRecorder, useScript, type Recorder } from "../ui";

type Profile = { name: string; unread: number; theme: "dark" | "light" };
type Store = ReturnType<typeof createStore<Profile, Partial<Profile>>>;
type Slot = "name" | "unread" | "badge";
type Counts = { bump(slot: Slot): void; of(slot: Slot): number };

const makeCounts = (): Counts => {
  const seen: Record<Slot, number> = { name: 0, unread: 0, badge: 0 };
  return {
    bump: (slot) => {
      seen[slot] += 1;
    },
    of: (slot) => seen[slot],
  };
};

const reduce = (state: Profile, action: Partial<Profile>): Profile => ({
  ...state,
  ...action,
});

/**
 * The readers are memoised because the panel around them re-renders on every
 * scripted step. Without that, the counts would measure the harness rather
 * than the store.
 */

/**
 * Counted from an effect, not from the render body. Writing during render is a
 * rules violation, and a render React threw away is not one anybody saw — a
 * commit is.
 */
function useCount(counts: Counts, slot: Slot, recorder: Recorder, text: string) {
  useEffect(() => {
    counts.bump(slot);
    recorder.push("render", text);
  });
}

const NameReader = memo(function NameReader({
  store,
  counts,
  recorder,
}: {
  store: Store;
  counts: Counts;
  recorder: Recorder;
}) {
  const name = useStore(store, (s: Profile) => s.name);
  useCount(counts, "name", recorder, `name ${name}`);
  return <Chip name="name" value={name} />;
});

const UnreadReader = memo(function UnreadReader({
  store,
  counts,
  recorder,
}: {
  store: Store;
  counts: Counts;
  recorder: Recorder;
}) {
  const unread = useStore(store, (s: Profile) => s.unread);
  useCount(counts, "unread", recorder, `unread ${unread}`);
  return <Chip name="unread" value={unread} />;
});

const BadgeReader = memo(function BadgeReader({
  store,
  counts,
  recorder,
}: {
  store: Store;
  counts: Counts;
  recorder: Recorder;
}) {
  // Returns `previous` whenever the slice is equivalent, so neither the render
  // nor the object identity downstream consumers depend on churns.
  const badge = useStore(
    store,
    (s: Profile, previous: { label: string } | undefined) => {
      const label = s.unread > 0 ? "some" : "none";
      return previous !== undefined && previous.label === label
        ? previous
        : { label };
    },
  );
  useCount(counts, "badge", recorder, `badge ${badge.label}`);
  return <Chip name="badge" value={badge.label} />;
});

/**
 * Selects the slice nobody else does. If a bail-out ever left the store's
 * commit pointer behind, the state later readers are built from would be
 * missing whatever happened while nothing was listening — and this is the
 * reader that would show it.
 */
const ThemeReader = memo(function ThemeReader({
  store,
}: {
  store: Store;
}) {
  const theme = useStore(store, (s: Profile) => s.theme);
  return <Chip name="theme" value={theme} />;
});

export function SelectorScenario() {
  const [{ store, recorder, counts }] = useState(() => ({
    store: createStore<Profile, Partial<Profile>>(
      { name: "ada", unread: 0, theme: "dark" },
      reduce,
    ),
    recorder: createRecorder(),
    counts: makeCounts(),
  }));

  const { verdict, run } = useScript(recorder, async (script) => {
    store.dispatch({ name: "ada", unread: 0, theme: "dark" });
    await script.wait(250);
    const base = {
      name: counts.of("name"),
      unread: counts.of("unread"),
      badge: counts.of("badge"),
    };

    store.dispatch({ theme: "light" });
    await script.step("change a slice nobody selected");
    script.check("name did not render", counts.of("name") - base.name, 0);
    script.check("unread did not render", counts.of("unread") - base.unread, 0);
    script.check("badge did not render", counts.of("badge") - base.badge, 0);

    store.dispatch({ unread: 1 });
    await script.step("change unread from 0 to 1");
    script.check("unread rendered once", counts.of("unread") - base.unread, 1);
    script.check("name still did not", counts.of("name") - base.name, 0);
    script.check("badge rendered: none to some", counts.of("badge") - base.badge, 1);

    store.dispatch({ unread: 2 });
    await script.step("change unread from 1 to 2");
    script.check("unread rendered again", counts.of("unread") - base.unread, 2);
    // Still "some", so the selector hands back its previous object.
    script.check("badge held its previous result", counts.of("badge") - base.badge, 1);
    script.check("name never rendered at all", counts.of("name") - base.name, 0);
    // The slice nobody watched while the others were bailing out is still
    // there: a stranded commit pointer would have lost it.
    script.check("the unwatched slice survived", store.getState().theme, "light");
  });

  return (
    <Card
      title="Selectors"
        rule="A selector can skip its own render"
proves={
        "A selector receives its own previous result. Return it and React " +
        "skips that component, so a change to a slice it does not read " +
        "costs it nothing and no equality function is needed. Renders are " +
        "counted on commit, so a render React started and threw away is not " +
        "counted against it."
      }
      recorder={recorder}
      stage={
        <div className="readers">
          <NameReader store={store} counts={counts} recorder={recorder} />
          <UnreadReader store={store} counts={counts} recorder={recorder} />
          <BadgeReader store={store} counts={counts} recorder={recorder} />
          <ThemeReader store={store} />
        </div>
      }
      controls={
        <>
          <button onClick={() => store.dispatch({ theme: "light" })}>
            toggle theme (unselected)
          </button>
          <button
            onClick={() => store.dispatch({ unread: store.getState().unread + 1 })}
          >
            unread +1
          </button>
          <button onClick={() => store.dispatch({ unread: 0 })}>unread = 0</button>
          <button onClick={() => store.dispatch({ name: "grace" })}>rename</button>
          <button className="run" onClick={run}>
            Run
          </button>
        </>
      }
      verdict={verdict}
    />
  );
}
