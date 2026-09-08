import { gsap } from "./gsap";

/**
 * The trailing cursor: a square project preview, a filled disc, and a label,
 * each following the pointer at its own lag. Hovering a work row slides the
 * preview stack to that project; hovering a tile grows the disc instead.
 */
export function initCursor(root: HTMLElement) {
  if (window.matchMedia("(pointer: coarse)").matches) return () => {};
  if (window.innerWidth <= 540) return () => {};

  const image = root.querySelector<HTMLElement>(".mouse-pos-list-image");
  const btn = root.querySelector<HTMLElement>(".mouse-pos-list-btn");
  const span = root.querySelector<HTMLElement>(".mouse-pos-list-span");
  const stack = root.querySelector<HTMLElement>(".float-image-wrap");
  if (!btn || !span) return () => {};

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  const pos = { image: { x: mouseX, y: mouseY }, btn: { x: mouseX, y: mouseY }, span: { x: mouseX, y: mouseY } };

  const onMouseMove = (event: MouseEvent) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  };

  const tick = () => {
    if (image) {
      pos.image.x += (mouseX - pos.image.x) / 12;
      pos.image.y += (mouseY - pos.image.y) / 12;
      gsap.set(image, { left: pos.image.x, top: pos.image.y });
    }
    pos.btn.x += (mouseX - pos.btn.x) / 7;
    pos.btn.y += (mouseY - pos.btn.y) / 7;
    gsap.set(btn, { left: pos.btn.x, top: pos.btn.y });

    pos.span.x += (mouseX - pos.span.x) / 6;
    pos.span.y += (mouseY - pos.span.y) / 6;
    gsap.set(span, { left: pos.span.x, top: pos.span.y });
  };

  document.addEventListener("mousemove", onMouseMove, { passive: true });
  gsap.ticker.add(tick);

  const all = [image, btn, span].filter(Boolean) as HTMLElement[];
  const listeners: (() => void)[] = [];

  const bind = (
    el: Element,
    type: string,
    handler: EventListenerOrEventListenerObject
  ) => {
    el.addEventListener(type, handler);
    listeners.push(() => el.removeEventListener(type, handler));
  };

  /* Work rows: preview panel + label */
  const rows = Array.from(
    root.querySelectorAll<HTMLElement>(".mouse-pos-list-image-wrap li[data-index]")
  );
  const stackCount = stack?.children.length ?? 0;
  rows.forEach((row, fallback) => {
    const link = row.querySelector("a");
    if (!link) return;
    const index = Number(row.dataset.index ?? fallback);
    bind(link, "mouseenter", () => {
      all.forEach((el) => el.classList.add("active"));
      if (stack && stackCount) {
        gsap.to(stack, {
          yPercent: (index * -100) / stackCount,
          duration: 0.6,
          ease: "power2.inOut",
        });
      }
    });
    bind(link, "mouseleave", () => {
      all.forEach((el) => el.classList.remove("active"));
    });
  });

  /* Tiles and next-case links: bigger disc, no preview */
  root.querySelectorAll(".single-tile-wrap a, .next-case-btn").forEach((el) => {
    bind(el, "mouseenter", () => {
      btn.classList.add("active-big");
      span.classList.add("active-big");
    });
    bind(el, "mouseleave", () => {
      btn.classList.remove("active-big");
      span.classList.remove("active-big");
    });
  });

  const onDown = () => all.forEach((el) => el.classList.add("pressed"));
  const onUp = () => all.forEach((el) => el.classList.remove("pressed"));
  document.addEventListener("mousedown", onDown);
  document.addEventListener("mouseup", onUp);

  return () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mousedown", onDown);
    document.removeEventListener("mouseup", onUp);
    gsap.ticker.remove(tick);
    listeners.forEach((off) => off());
    all.forEach((el) => el.classList.remove("active", "active-big", "pressed"));
  };
}
