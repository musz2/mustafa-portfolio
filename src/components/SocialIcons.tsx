import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import { MdEmail, MdPhone } from "react-icons/md";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import gsap from "gsap";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social");
    if (!social) return;

    // Coarse pointers never hover, so the magnetic effect is pure cost there.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const icons = Array.from(social.querySelectorAll("span")).map((item) => {
      const elem = item as HTMLElement;
      return {
        elem,
        link: elem.querySelector("a") as HTMLElement,
        rect: elem.getBoundingClientRect(),
        targetX: 0,
        targetY: 0,
        x: 0,
        y: 0,
      };
    });

    let pointerX = -9999;
    let pointerY = -9999;
    let settled = false;

    const onMouseMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      settled = false;
      gsap.ticker.add(tick);
    };

    // One shared ticker for every icon, and it parks itself once motion settles
    // rather than running a rAF loop forever.
    const tick = () => {
      let moving = false;

      for (const icon of icons) {
        const { rect } = icon;
        const dx = pointerX - (rect.left + rect.width / 2);
        const dy = pointerY - (rect.top + rect.height / 2);
        const near = Math.abs(dx) < 26 && Math.abs(dy) < 26;

        icon.targetX = near ? dx * 0.45 : 0;
        icon.targetY = near ? dy * 0.45 : 0;

        icon.x += (icon.targetX - icon.x) * 0.14;
        icon.y += (icon.targetY - icon.y) * 0.14;

        if (Math.abs(icon.x - icon.targetX) > 0.05 ||
            Math.abs(icon.y - icon.targetY) > 0.05) {
          moving = true;
        }

        // translate3d keeps this on the compositor — no layout, no repaint.
        icon.link.style.transform =
          `translate(-50%, -50%) translate3d(${icon.x.toFixed(2)}px, ${icon.y.toFixed(2)}px, 0)`;
      }

      if (!moving && !settled) {
        settled = true;
        gsap.ticker.remove(tick);
      }
    };

    const onResize = () => {
      for (const icon of icons) icon.rect = icon.elem.getBoundingClientRect();
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/musz2"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://linkedin.com/in/mustafa28"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="mailto:alisyedmustafa28@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <MdEmail />
          </a>
        </span>
        <span>
          <a
            href="tel:+917995370881"
            target="_blank"
            rel="noreferrer"
          >
            <MdPhone />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/Syed_Mustafa_Ali_Resume.pdf"
        target="_blank"
        rel="noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
