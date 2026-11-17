/**
 * Demonstrating how a Redux store could be connected to React using
 * `createStore` and `useStoreSelector`.
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, act } from "@testing-library/react";
import { useState, startTransition } from "react";
import {
  combineReducers,
  configureStore,
  createSlice,
  PayloadAction,
  StoreEnhancer,
} from "@reduxjs/toolkit";
import { experimental } from "../../index";
import Logger from "../../../test/TestLogger";

const { createStoreFromSource, StoreProvider, useStoreSelector } = experimental;

let logger: Logger;

beforeEach(() => {
  logger = new Logger();
});

afterEach(() => {
  logger.assertLog([]);
});

/**
 * Sketch of a possible way to produce a React store alongside a Redux store
 * using Redux's enhancer mechanism.
 *
 * The Redux Store's API poses two problems for React:
 *
 * 1. It does not expose the update action to subscribers
 * 2. It does not expose the reducer function to outsiders
 *
 * These are both needed by React since it needs to be able to implement React's
 * update reordering smeantics. To work around this, we emply a store enhancer
 * which allows us to:
 *
 * 1. Monkey patch Store.dispatch so that we can observe update actions
 * 2. Capture the reducer function such that we can produce temporary states to
 *   implement reordering semantics
 *
 * https://jordaneldredge.com/notes/react-rebasing/
 */
const addReactStore: StoreEnhancer<any> = (createReduxStore) => {
  return (reducer, preloadedState) => {
    const store = createReduxStore(reducer, preloadedState);

    // The Redux store

    // Redux's subscribe does not expose the aciton being processed, and React's
    // store needs access to the action so that it can perform temporary update
    // reordering.
    const reactStore = createStoreFromSource({
      getState: store.getState,
      reducer: reducer,
    });

    function dispatch(action: any) {
      store.dispatch(action);
      reactStore.handleUpdate(action);
    }

    return { ...store, dispatch, reactStore };
  };
};

describe("createStore for Redux", () => {
  it("Using Redux Toolkit's configureStore", async () => {
    const counterSlice = createSlice({
      name: "counter",
      initialState: { value: 1 },
      reducers: {
        increment: (state) => {
          // Immer.js makes this immutable
          state.value += 1;
        },
        decrement: (state) => {
          // Immer.js makes this immutable
          state.value -= 1;
        },
      },
    });

    const { increment } = counterSlice.actions;

    const reducer = combineReducers({ counter: counterSlice.reducer });

    const reduxStore = configureStore({
      reducer: { counter: counterSlice.reducer },
      enhancers: (getDefaultEnhancers) => {
        return getDefaultEnhancers().concat(addReactStore);
      },
    });

    // @ts-expect-error TODO: Figure out typing of store enhancers
    const store = reduxStore.reactStore;

    // Selector
    function getCount(state: ReturnType<typeof reducer>) {
      return state.counter.value;
    }

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(store, getCount);
      logger.log({ testid, count });
      return <div>{count}</div>;
    }

    let setShowOther: (value: boolean) => void;

    function App() {
      const [showOther, _setShowOther] = useState(false);
      // It's okay to leak set state in a test.
      setShowOther = _setShowOther;
      return (
        <StoreProvider>
          <Count testid="count" />
          {showOther && <Count testid="otherCount" />}
        </StoreProvider>
      );
    }

    const { asFragment, unmount } = await act(async () => {
      return render(<App />);
    });

    logger.assertLog([{ testid: "count", count: 1 }]);

    // Check that we mount correctly
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          1
        </div>
      </DocumentFragment>
    `);

    let resolve: () => void;

    // Start, but don't complete, a transition update
    await act(async () => {
      startTransition(async () => {
        reduxStore.dispatch(increment());
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    logger.assertLog([]);

    // Check that the update has not flushed yet
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          1
        </div>
      </DocumentFragment>
    `);

    // Reveal a new component which must read state on mount
    await act(async () => {
      setShowOther(true);
    });

    logger.assertLog([
      { testid: "count", count: 1 },
      // We initially render with the transition state
      { testid: "otherCount", count: 2 },
      // And then fixup in our useLayoutEffect to go back to the
      // sync state
      { testid: "otherCount", count: 1 },
    ]);
    // Check we mount with the pre-transition state
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          1
        </div>
        <div>
          1
        </div>
      </DocumentFragment>
    `);

    // Complete the transition
    await act(async () => {
      resolve();
    });

    logger.assertLog([
      { testid: "count", count: 2 },
      { testid: "otherCount", count: 2 },
    ]);

    // Check the original count component updated
    // Check the newly mounted count component updated
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          2
        </div>
        <div>
          2
        </div>
      </DocumentFragment>
    `);
    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("Supports reducers which read one entity to decide how to update others (Gmail-style labels)", async () => {
    // Emails can have multiple labels (like tags). Each label tracks how many
    // unread emails it contains.
    //
    // Note that we can't derive a label's unread count on the client by
    // counting its unread emails, since the client can't reasonably have every
    // email in the mailbox loaded. Instead, the count is a field on the label
    // that comes from the server, and reducers must keep it in sync by hand.
    type Label = { id: string; name: string; unreadCount: number };
    type Email = {
      id: string;
      subject: string;
      isRead: boolean;
      labelIds: string[];
    };
    type MailState = {
      labelIds: string[];
      emailIds: string[];
      labels: Record<string, Label>;
      emails: Record<string, Email>;
    };

    const initialState: MailState = {
      labelIds: ["label:foo", "label:bar", "label:baz"],
      emailIds: ["email:1", "email:2", "email:3"],
      labels: {
        "label:foo": { id: "label:foo", name: "Foo", unreadCount: 2 },
        "label:bar": { id: "label:bar", name: "Bar", unreadCount: 1 },
        "label:baz": { id: "label:baz", name: "Baz", unreadCount: 1 },
      },
      emails: {
        "email:1": {
          id: "email:1",
          subject: "Lunch?",
          isRead: false,
          labelIds: ["label:foo", "label:bar"],
        },
        "email:2": {
          id: "email:2",
          subject: "Quarterly report",
          isRead: false,
          labelIds: ["label:foo"],
        },
        "email:3": {
          id: "email:3",
          subject: "Weekend plans",
          isRead: false,
          labelIds: ["label:baz"],
        },
      },
    };

    const mailSlice = createSlice({
      name: "mail",
      initialState,
      reducers: {
        // Marking an email as read must also decrement the unread count of
        // every label on that email. To do that, the reducer has to *read* the
        // email (its `isRead` and `labelIds` fields) from the state it is
        // applied to, and use those values to decide which other entities (the
        // labels) to update and how.
        markEmailAsRead: (state, action: PayloadAction<string>) => {
          const email = state.emails[action.payload];
          // Already read: label counts must not be decremented a second time.
          if (email.isRead) {
            return;
          }
          email.isRead = true;
          for (const labelId of email.labelIds) {
            state.labels[labelId].unreadCount -= 1;
          }
        },
        // Removing a label from an email must decrement that label's unread
        // count, but only if the email is still unread. Again, the reducer
        // reads the email's `isRead` from the state it is applied to in order
        // to decide whether to touch the label.
        removeLabelFromEmail: (
          state,
          action: PayloadAction<{ emailId: string; labelId: string }>,
        ) => {
          const { emailId, labelId } = action.payload;
          const email = state.emails[emailId];
          if (!email.labelIds.includes(labelId)) {
            return;
          }
          email.labelIds = email.labelIds.filter((id) => id !== labelId);
          if (!email.isRead) {
            state.labels[labelId].unreadCount -= 1;
          }
        },
      },
    });

    const { markEmailAsRead, removeLabelFromEmail } = mailSlice.actions;

    const reduxStore = configureStore({
      reducer: { mail: mailSlice.reducer },
      enhancers: (getDefaultEnhancers) => {
        return getDefaultEnhancers().concat(addReactStore);
      },
    });

    // @ts-expect-error TODO: Figure out typing of store enhancers
    const store = reduxStore.reactStore;

    // Selector. Immer's structural sharing means this returns a new object
    // only when something in the mail slice changes.
    function getMail(state: { mail: MailState }) {
      return state.mail;
    }

    function Mailbox() {
      const mail: MailState = useStoreSelector(store, getMail);
      logger.log({ type: "render" });
      return (
        <>
          <ul>
            {mail.labelIds.map((labelId) => {
              const label = mail.labels[labelId];
              return (
                <li key={label.id}>{`${label.name} (${label.unreadCount})`}</li>
              );
            })}
          </ul>
          <ul>
            {mail.emailIds.map((emailId) => {
              const email = mail.emails[emailId];
              return (
                <li key={email.id}>
                  {`${email.subject} [${email.labelIds
                    .map((labelId) => mail.labels[labelId].name)
                    .join(", ")}]${email.isRead ? "" : " (unread)"}`}
                </li>
              );
            })}
          </ul>
        </>
      );
    }

    function App() {
      return (
        <StoreProvider>
          <Mailbox />
        </StoreProvider>
      );
    }

    const { asFragment, unmount } = await act(async () => {
      return render(<App />);
    });

    logger.assertLog([{ type: "render" }]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <ul>
          <li>
            Foo (2)
          </li>
          <li>
            Bar (1)
          </li>
          <li>
            Baz (1)
          </li>
        </ul>
        <ul>
          <li>
            Lunch? [Foo, Bar] (unread)
          </li>
          <li>
            Quarterly report [Foo] (unread)
          </li>
          <li>
            Weekend plans [Baz] (unread)
          </li>
        </ul>
      </DocumentFragment>
    `);

    let resolve: () => void;

    // Start, but don't complete, a transition which marks "Lunch?" as read.
    await act(async () => {
      startTransition(async () => {
        reduxStore.dispatch(markEmailAsRead("email:1"));
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    logger.assertLog([]);

    // The transition is still pending, so nothing has changed yet.
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <ul>
          <li>
            Foo (2)
          </li>
          <li>
            Bar (1)
          </li>
          <li>
            Baz (1)
          </li>
        </ul>
        <ul>
          <li>
            Lunch? [Foo, Bar] (unread)
          </li>
          <li>
            Quarterly report [Foo] (unread)
          </li>
          <li>
            Weekend plans [Baz] (unread)
          </li>
        </ul>
      </DocumentFragment>
    `);

    // Interrupt with a sync update which removes the Bar label from "Lunch?".
    await act(() => {
      reduxStore.dispatch(
        removeLabelFromEmail({ emailId: "email:1", labelId: "label:bar" }),
      );
    });

    logger.assertLog([{ type: "render" }]);

    // The sync update is applied on top of the committed state, where "Lunch?"
    // is still unread. So removing Bar from it decrements Bar's unread count.
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <ul>
          <li>
            Foo (2)
          </li>
          <li>
            Bar (0)
          </li>
          <li>
            Baz (1)
          </li>
        </ul>
        <ul>
          <li>
            Lunch? [Foo] (unread)
          </li>
          <li>
            Quarterly report [Foo] (unread)
          </li>
          <li>
            Weekend plans [Baz] (unread)
          </li>
        </ul>
      </DocumentFragment>
    `);

    // Complete the transition.
    await act(async () => {
      resolve();
    });

    logger.assertLog([{ type: "render" }]);

    // The final state reflects the rebased update order:
    //   1. markEmailAsRead (transition): "Lunch?" is unread with labels
    //      [Foo, Bar], so both Foo and Bar are decremented.
    //   2. removeLabelFromEmail (sync): "Lunch?" is now read, so removing Bar
    //      does not decrement Bar a second time.
    // Each label ends up decremented exactly once. This only works because
    // each reducer reads the email from the state it is applied to, rather
    // than deciding up front which labels to change.
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <ul>
          <li>
            Foo (1)
          </li>
          <li>
            Bar (0)
          </li>
          <li>
            Baz (1)
          </li>
        </ul>
        <ul>
          <li>
            Lunch? [Foo]
          </li>
          <li>
            Quarterly report [Foo] (unread)
          </li>
          <li>
            Weekend plans [Baz] (unread)
          </li>
        </ul>
      </DocumentFragment>
    `);

    unmount();
    expect(store._listeners.length).toBe(0);
  });
});
