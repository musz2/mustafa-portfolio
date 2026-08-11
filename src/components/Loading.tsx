import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Was scheduled straight from the render body, so every re-render at 100%
  // queued another pair of timers.
  useEffect(() => {
    if (percent < 100) return;

    let inner: number | undefined;
    const outer = setTimeout(() => {
      setLoaded(true);
      inner = setTimeout(() => setIsLoaded(true), 700);
    }, 400);

    return () => {
      clearTimeout(outer);
      clearTimeout(inner);
    };
  }, [percent]);

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 900);
      }
    });
  }, [isLoaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          SMA
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> DevOps Engineer</span> <span>Cloud Engineer</span>
            <span> DevOps Engineer</span> <span>Cloud Engineer</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

/** Reports genuine asset-load progress.
 *
 *  This used to be a simulation: it raced to ~50%, then crawled at roughly
 *  +0.5% every 2 seconds regardless of what had actually loaded, so a fast
 *  connection still sat through up to ~80s of invented waiting. It is now fed
 *  by real bytes and real pipeline phases from the character loader.
 *
 *  The displayed number eases toward the reported target so it reads smoothly
 *  instead of jumping, and it never moves backwards. */
export const setProgress = (setLoading: (value: number) => void) => {
  let shown = 0;
  let done = false;

  /** Fed by real download bytes and pipeline phases. Monotonic, and it only
   *  pushes state when the whole number actually changes, so loading does not
   *  re-render React on every chunk. */
  function report(value: number) {
    if (done) return;
    const next = Math.min(Math.round(value), 99);
    if (next <= shown) return;
    shown = next;
    setLoading(shown);
  }

  function finish() {
    done = true;
    shown = 100;
    setLoading(100);
  }

  function clear() {
    finish();
  }

  function loaded() {
    finish();
    return Promise.resolve(100);
  }

  return { loaded, report, clear };
};
