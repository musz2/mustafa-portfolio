import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";
import { site } from "../data/site";

/**
 * The oversized name band. Two identical copies sit side by side and the pair
 * slides half its width forever, so the loop is seamless; scrolling up flips
 * the direction of travel. Only the first copy is a real heading — the second
 * is a decorative duplicate.
 */
export default function RollingName() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;

    const tl = gsap.to(el, {
      xPercent: -50,
      duration: 26,
      ease: "none",
      repeat: -1,
    });

    let direction = 1;
    const trigger = ScrollTrigger.create({
      onUpdate(self) {
        if (self.direction !== direction) {
          direction = self.direction;
          gsap.to(tl, { timeScale: direction, duration: 0.4, overwrite: true });
        }
      },
    });

    return () => {
      trigger.kill();
      tl.kill();
    };
  }, []);

  const label = (
    <>
      {site.heroName}
      <span className="spacer" aria-hidden="true">
        —
      </span>
    </>
  );

  return (
    <div className="big-name">
      <div className="name-h1" ref={track}>
        <div className="name-wrap">
          <h1 className="name-line no-select">{label}</h1>
        </div>
        <div className="name-wrap" aria-hidden="true">
          <div className="name-line no-select">{label}</div>
        </div>
      </div>
    </div>
  );
}
