import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

let lenis: Lenis | null = null;
let rafId = 0;

/**
 * One Lenis instance for the whole app, driven by GSAP's ticker so that
 * smoothing and every ScrollTrigger share a single frame.
 */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return null;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const raf = (time: number) => {
    lenis?.raf(time * 1000);
  };

  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  rafId = 1;

  return () => {
    gsap.ticker.remove(raf);
    lenis?.destroy();
    lenis = null;
    rafId = 0;
  };
}

/* The loader locks the page before Lenis exists, so the class and the Lenis
   instance have to be driven together — locking one way and releasing the
   other left `is-locked` (and its `overflow: hidden`) stuck on the body.
   Desktop never noticed, because Lenis scrolls programmatically; touch
   devices scroll natively and were frozen by it. */
export const stopScroll = () => {
  lenis?.stop();
  document.body.classList.add("is-locked");
};

export const startScroll = () => {
  lenis?.start();
  document.body.classList.remove("is-locked");
};

export const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
};

export const isSmoothScrollRunning = () => rafId !== 0;
