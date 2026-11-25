import Lenis from "lenis";
import { gsap, ScrollTrigger, isTouch, prefersReducedMotion } from "./gsap";

let lenis: Lenis | null = null;
let rafId = 0;

/**
 * One Lenis instance for the whole app, driven by GSAP's ticker so that
 * smoothing and every ScrollTrigger share a single frame.
 *
 * Pointer devices only. Lenis is configured without `syncTouch`, so on a
 * phone it smooths nothing — touch already scrolls natively — but it still
 * binds non-passive `touchmove` listeners that call `preventDefault()` for
 * as long as it is stopped or locked. One stop that never gets released
 * (an interrupted page transition, a nav that closes mid-animation) and the
 * page can no longer be moved with a thumb, while a two-finger pinch-pan
 * still works because the browser drives that above the event stream.
 * Nothing is lost by leaving touch scrolling to the platform.
 */
export function initSmoothScroll() {
  if (lenis || isTouch() || prefersReducedMotion()) return null;

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
   The class goes on <html> as well as <body>: Safari only propagates the
   lock to the viewport reliably when the root element carries it too. */
type ScrollOwner = "transition" | "menu" | "filter";
const locks = new Set<ScrollOwner>();

export const stopScroll = (owner: ScrollOwner = "transition") => {
  locks.add(owner);
  lenis?.stop();
  document.documentElement.classList.add("is-locked");
  document.body.classList.add("is-locked");
};

export const startScroll = (owner: ScrollOwner = "transition") => {
  locks.delete(owner);
  if (locks.size) return;
  lenis?.start();
  document.documentElement.classList.remove("is-locked");
  document.body.classList.remove("is-locked");
};

export const setScrollPosition = (top: number) => {
  if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
  window.scrollTo(0, top);
};

export const scrollToTop = () => setScrollPosition(0);

export const isSmoothScrollRunning = () => rafId !== 0;
