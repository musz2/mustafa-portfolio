import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Magnetic buttons — the element leans toward the pointer, its label leans a
 * little less, and both spring back on leave. Pointer-only; coarse pointers
 * never hover, so the listeners are never attached there.
 */
export function initMagnetic(root: HTMLElement) {
  if (window.matchMedia("(pointer: coarse)").matches) return () => {};
  if (window.innerWidth <= 540 || prefersReducedMotion()) return () => {};

  const magnets = Array.from(root.querySelectorAll<HTMLElement>(".magnetic"));
  const cleanups: (() => void)[] = [];

  magnets.forEach((magnet) => {
    const text = magnet.querySelector<HTMLElement>(".btn-text");
    const fill = magnet.querySelector<HTMLElement>(".btn-fill");
    const change = magnet.querySelector<HTMLElement>(".btn-text-inner.change");
    const strength = Number(magnet.dataset.strength || 30);
    const strengthText = Number(magnet.dataset.strengthText || 15);

    const onMove = (event: MouseEvent) => {
      const bounds = magnet.getBoundingClientRect();
      const relX = (event.clientX - bounds.left) / magnet.offsetWidth - 0.5;
      const relY = (event.clientY - bounds.top) / magnet.offsetHeight - 0.5;

      gsap.to(magnet, {
        x: relX * strength,
        y: relY * strength,
        rotate: 0.001,
        duration: 1.5,
        ease: "power4.out",
      });
      if (text) {
        gsap.to(text, {
          x: relX * strengthText,
          y: relY * strengthText,
          rotate: 0.001,
          duration: 1.5,
          ease: "power4.out",
        });
      }
    };

    const onEnter = () => {
      if (fill) {
        gsap.to(fill, {
          startAt: { yPercent: 76 },
          yPercent: 0,
          duration: 0.6,
          ease: "power2.inOut",
        });
      }
      if (change) {
        gsap.to(change, {
          startAt: { color: "#1C1D20" },
          color: "#FFFFFF",
          duration: 0.3,
          ease: "power3.in",
        });
      }
    };

    const onLeave = () => {
      gsap.to(magnet, { x: 0, y: 0, duration: 1.5, ease: "elastic.out(1, 0.4)" });
      if (text) gsap.to(text, { x: 0, y: 0, duration: 1.5, ease: "elastic.out(1, 0.4)" });
      if (fill) gsap.to(fill, { yPercent: -76, duration: 0.6, ease: "power2.inOut" });
      if (change) {
        gsap.to(change, { color: "#1C1D20", duration: 0.3, ease: "power3.out", delay: 0.3 });
      }
    };

    magnet.addEventListener("mousemove", onMove);
    magnet.addEventListener("mouseenter", onEnter);
    magnet.addEventListener("mouseleave", onLeave);

    cleanups.push(() => {
      magnet.removeEventListener("mousemove", onMove);
      magnet.removeEventListener("mouseenter", onEnter);
      magnet.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf([magnet, text, fill, change].filter(Boolean) as HTMLElement[]);
      gsap.set(magnet, { clearProps: "transform" });
      if (text) gsap.set(text, { clearProps: "transform" });
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
