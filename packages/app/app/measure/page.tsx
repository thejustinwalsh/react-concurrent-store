import { MeasurePage } from "../../src/demos/measure";
import { Lede, Note } from "../../src/prose";

export default function Page() {
  return (
    <>
      <Lede
        title="Measuring update cost"
        learn={[
          "What an update costs with many components reading one store",
          "Why a number from jsdom or a development build is not that",
        ]}
      >
        <Note>
          <p>
            Run this on a production build. React&rsquo;s development build does
            extra work for every <code>use()</code> of a promise that production
            does not, so a development number is not a performance number.
          </p>
        </Note>
      </Lede>
      <MeasurePage />
    </>
  );
}
