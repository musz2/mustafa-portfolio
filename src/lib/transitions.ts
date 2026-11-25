import { greetings, type Greeting } from "../data/site";
import { gsap, isTouch, prefersReducedMotion } from "./gsap";
import { startScroll, stopScroll } from "./smoothScroll";

const isSmall = () => window.innerWidth <= 540;
const bottomHeight = () => (isSmall() ? "5vh" : "10vh");

/** Cold start on the home page — the greetings cycle before the curtain lifts. */
export function runHomeLoader(showGreeting: (greeting: Greeting) => void) {
  const tl = gsap.timeline();
  if (isTouch()) tl.timeScale(2.2);

  if (prefersReducedMotion()) {
    tl.set(".loading-screen", { top: "-100%" });
    tl.set(".loading-words", { opacity: 0 });
    tl.set("main .once-in", { y: 0, clearProps: "all" });
    tl.call(startScroll);
    return tl;
  }

  tl.call(stopScroll);
  tl.set(".loading-screen", { top: "0%" });
  tl.set("main .once-in", { y: isSmall() ? "10vh" : "50vh" });
  tl.set(".loading-words", { opacity: 0, y: -50 });
  tl.set(".loading-screen .rounded-div-wrap.bottom", { height: bottomHeight() });
  tl.set("html", { cursor: "wait" });

  tl.to(".loading-words", {
    duration: 0.8,
    opacity: 1,
    y: -50,
    ease: "power4.out",
    delay: 0.4,
  });

  // Schedule each replacement on the curtain's clock, including its touch time scale.
  const interval = isTouch() ? 0.33 : 0.15;
  greetings.slice(1).forEach((greeting, index) => {
    tl.call(() => showGreeting(greeting), [], 0.8 + (index + 1) * interval);
  });

  tl.to(".loading-screen", {
    duration: 0.8,
    top: "-100%",
    ease: "power4.inOut",
    delay: 0.2,
  });

  tl.to(
    ".loading-screen .rounded-div-wrap.bottom",
    { duration: 1, height: "0vh", ease: "power4.inOut" },
    "-=0.8"
  );

  tl.to(".loading-words", { duration: 0.3, opacity: 0, ease: "none" }, "-=0.8");

  tl.set(".loading-screen", { top: "-100%" });
  tl.set(".loading-screen .rounded-div-wrap.bottom", { height: "0vh" });

  tl.to(
    "main .once-in",
    { duration: 1.5, y: "0vh", stagger: 0.07, ease: "expo.out", clearProps: "transform" },
    "-=0.8"
  );

  tl.set("html", { cursor: "auto" }, "-=1.2");
  tl.call(startScroll);

  return tl;
}

/** Cold start on any inner page — same curtain, single word. */
export function runPageLoader() {
  const tl = gsap.timeline();
  if (isTouch()) tl.timeScale(2.2);

  if (prefersReducedMotion()) {
    tl.set(".loading-screen", { top: "-100%" });
    tl.set(".loading-words", { opacity: 0 });
    tl.set("main .once-in", { y: 0, clearProps: "all" });
    tl.call(startScroll);
    return tl;
  }

  tl.call(stopScroll);
  tl.set(".loading-screen", { top: "0%" });
  tl.set("main .once-in", { y: isSmall() ? "10vh" : "50vh" });
  tl.set(".loading-words", { opacity: 1, y: -50 });
  tl.set(".loading-screen .rounded-div-wrap.bottom", { height: bottomHeight() });
  tl.set("html", { cursor: "wait" });

  tl.to(".loading-screen", { duration: 0.8, top: "-100%", ease: "power4.inOut", delay: 0.4 });
  tl.to(
    ".loading-screen .rounded-div-wrap.bottom",
    { duration: 1, height: "0vh", ease: "power4.inOut" },
    "-=0.8"
  );
  tl.to(".loading-words", { duration: 0.3, opacity: 0, ease: "none" }, "-=0.8");

  tl.set(".loading-screen", { top: "-100%" });
  tl.set(".loading-screen .rounded-div-wrap.bottom", { height: "0vh" });

  tl.to(
    "main .once-in",
    { duration: 1, y: "0vh", stagger: 0.05, ease: "expo.out", clearProps: "transform" },
    "-=0.8"
  );
  tl.set("html", { cursor: "auto" }, "-=0.8");
  tl.call(startScroll);

  return tl;
}

/** Curtain sweeps up over the outgoing page. */
export const routeCoverMs = () => prefersReducedMotion() ? 0 : isTouch() ? 250 : 495;

export function pageTransitionIn() {
  const tl = gsap.timeline();
  if (isTouch()) tl.timeScale(2);

  if (prefersReducedMotion()) return tl;

  tl.call(stopScroll);
  tl.set(".loading-screen", { top: "100%" });
  tl.set(".loading-words", { opacity: 0, y: 0 });
  tl.set("html", { cursor: "wait" });
  tl.set(".loading-screen .rounded-div-wrap.bottom", { height: bottomHeight() });

  tl.to(".loading-screen", { duration: 0.5, top: "0%", ease: "power4.in" });
  tl.to(
    ".loading-screen .rounded-div-wrap.top",
    { duration: 0.4, height: "10vh", ease: "power4.in" },
    "-=0.5"
  );

  tl.to(".loading-words", {
    duration: 0.8,
    opacity: 1,
    y: -50,
    ease: "power4.out",
    delay: 0.05,
  });

  tl.set(".loading-screen .rounded-div-wrap.top", { height: "0vh" });

  tl.to(".loading-screen", { duration: 0.8, top: "-100%", ease: "power3.inOut" }, "-=0.2");
  tl.to(".loading-words", { duration: 0.6, opacity: 0, ease: "none" }, "-=0.8");
  tl.to(
    ".loading-screen .rounded-div-wrap.bottom",
    { duration: 0.85, height: 0, ease: "power3.inOut" },
    "-=0.6"
  );

  tl.set("html", { cursor: "auto" }, "-=0.6");
  tl.set(".loading-screen .rounded-div-wrap.bottom", { height: bottomHeight() });
  tl.set(".loading-screen", { top: "100%" });
  tl.set(".loading-words", { opacity: 0 });

  return tl;
}

/** Incoming page rises into place behind the curtain. */
export function pageTransitionOut() {
  const tl = gsap.timeline();
  if (isTouch()) tl.timeScale(2);

  if (prefersReducedMotion()) {
    tl.set("main .once-in", { y: 0, clearProps: "all" });
    tl.call(startScroll);
    return tl;
  }

  tl.set("main .once-in", { y: isSmall() ? "20vh" : "50vh" });
  tl.call(startScroll);
  tl.to("main .once-in", {
    duration: 1,
    y: "0vh",
    stagger: 0.05,
    ease: "expo.out",
    delay: 0.7,
    clearProps: "transform",
  });

  return tl;
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
