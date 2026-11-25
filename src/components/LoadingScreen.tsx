import type { Greeting } from "../data/site";
import { useRouter } from "../router/Router";

/**
 * The curtain. On a cold home load it cycles greetings; on every route change
 * it carries the name of the page being opened.
 */
export default function LoadingScreen({ greeting }: { greeting: Greeting | null }) {
  const { transitionLabel } = useRouter();

  return (
    <div className="loading-container" aria-hidden="true">
      <div className="loading-screen">
        <div className="rounded-div-wrap top">
          <div className="rounded-div" />
        </div>
        <div className="loading-words">
          <h2 className={greeting?.script ? "script" : undefined}>
            {greeting?.text ?? transitionLabel}
            <span className="dot" />
          </h2>
        </div>
        <div className="rounded-div-wrap bottom">
          <div className="rounded-div" />
        </div>
      </div>
    </div>
  );
}
