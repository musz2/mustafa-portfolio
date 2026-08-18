import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";
import { onViewportResize } from "./utils/viewport";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      // 1.7 lagged noticeably behind the wheel; ~1 stays smooth but tracks input.
      smooth: 1,
      speed: 1,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".header ul a")
    );

    // ScrollSmoother only drives the scroll on pointer-fine viewports; below
    // that the page scrolls natively, so let the anchor do its own work.
    const onLinkClick = (e: MouseEvent) => {
      if (window.innerWidth <= 1024) return;
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const section = target.getAttribute("data-href");
      if (section) smoother.scrollTo(section, true, "top top");
    };

    links.forEach((element) => element.addEventListener("click", onLinkClick));

    // Was an undebounced, never-removed listener that forced a full smoother
    // refresh on every address-bar move.
    const stopResize = onViewportResize(() => ScrollSmoother.refresh(true));

    return () => {
      links.forEach((element) =>
        element.removeEventListener("click", onLinkClick)
      );
      stopResize();
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          SMA
        </a>
        <a
          href="mailto:alisyedmustafa28@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          alisyedmustafa28@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
