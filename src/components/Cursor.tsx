import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || window.matchMedia("(hover: none)").matches) return;

    let hover = false;
    let rafId = 0;
    const mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cursorPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    const loop = () => {
      if (!hover) {
        const delay = 3;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.set(cursor, { x: cursorPos.x, y: cursorPos.y });
      }
      rafId = requestAnimationFrame(loop);
    };

    const cursorTargets = Array.from(document.querySelectorAll("[data-cursor]"));

    const onMouseOver = (e: Event) => {
      const element = e.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();

      if (element.dataset.cursor === "icons") {
        cursor.classList.add("cursor-icons");
        cursor.classList.remove("cursor-disable");
        gsap.to(cursor, {
          x: rect.left,
          y: rect.top,
          duration: 0.12,
          overwrite: true,
          ease: "power2.out",
        });
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      }

      if (element.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const onMouseOut = () => {
      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };

    document.addEventListener("mousemove", onMouseMove);
    cursorTargets.forEach((item) => {
      item.addEventListener("mouseover", onMouseOver);
      item.addEventListener("mouseout", onMouseOut);
    });
    rafId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cursorTargets.forEach((item) => {
        item.removeEventListener("mouseover", onMouseOver);
        item.removeEventListener("mouseout", onMouseOut);
      });
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
