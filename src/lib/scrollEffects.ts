import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

type Ctx = { revert: () => void };

interface Options {
  /** React owns <main>'s class list, so the scrolled flag is reported out. */
  onScrolled?: (scrolled: boolean) => void;
}

/**
 * Wraps every word of a `.span-lines` block in an overflow-hidden mask so the
 * lines can be revealed from below, the way the reference intro does it.
 */
function splitWords(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>(".span-lines:not([data-split])").forEach((el) => {
    el.setAttribute("data-split", "true");
    el.innerHTML = el.innerHTML.replace(
      /(^|<\/?[^>]+>|\s+)([^\s<]+)/g,
      '$1<span class="span-line"><span class="span-line-inner">$2</span></span>'
    );
  });
}

/**
 * All scroll-driven behaviour for one page: parallax on `[data-speed]`,
 * masked word reveals, fade-ins, the footer's rounded divider, and the
 * arrows that rotate as you pass them.
 */
export function initScrollEffects(root: HTMLElement, options: Options = {}): Ctx {
  splitWords(root);

  const ctx = gsap.context(() => {
    const reduced = prefersReducedMotion();

    /* --- Parallax ------------------------------------------------------- */
    if (!reduced) {
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0");
        if (!speed) return;
        const horizontal = el.dataset.direction === "horizontal";
        // Expressed in vh so the throw scales with the viewport, the way the
        // reference's scroll-speed values behave.
        const distance = `${speed * 6}vh`;

        gsap.fromTo(
          el,
          horizontal ? { x: 0 } : { y: 0 },
          {
            [horizontal ? "x" : "y"]: distance,
            ease: "none",
            scrollTrigger: {
              trigger: el.dataset.trigger
                ? (el.closest(el.dataset.trigger) as HTMLElement) || el
                : el,
              start: el.dataset.start || "top bottom",
              end: el.dataset.end || "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }

    /* --- Masked word reveal --------------------------------------------- */
    gsap.utils.toArray<HTMLElement>(".span-lines.animate").forEach((el) => {
      const targets = el.querySelectorAll(".span-line-inner");
      if (!targets.length) return;
      gsap.from(targets, {
        y: reduced ? 0 : "100%",
        opacity: reduced ? 0 : 1,
        stagger: 0.012,
        ease: "power3.out",
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 100%",
          end: "bottom top",
          toggleActions: "play none none reset",
        },
      });
    });

    /* --- Fade in --------------------------------------------------------- */
    gsap.utils.toArray<HTMLElement>(".fade-in.animate").forEach((el) => {
      gsap.from(el, {
        y: reduced ? 0 : "2em",
        opacity: 0,
        ease: "expo.out",
        duration: 1.75,
        scrollTrigger: {
          trigger: el,
          start: "top 110%",
          end: "bottom top",
          toggleActions: "play none none reset",
        },
      });
    });

    /* --- Stripes draw in -------------------------------------------------- */
    gsap.utils.toArray<HTMLElement>(".stripe.animate").forEach((el) => {
      gsap.from(el, {
        scaleX: 0,
        transformOrigin: "left center",
        ease: "expo.out",
        duration: 1.4,
        scrollTrigger: {
          trigger: el,
          start: "top 100%",
          toggleActions: "play none none reset",
        },
      });
    });

    /* --- Site recordings play only while they are on screen ---------------
       Off-screen video is wasted decode work, so each one starts on enter
       and pauses on leave. Reduced motion leaves the poster showing. */
    gsap.utils.toArray<HTMLElement>(".playpauze").forEach((wrap) => {
      const video = wrap.querySelector("video");
      if (!video) return;

      if (reduced) {
        video.pause();
        return;
      }

      const play = () => {
        const attempt = video.play();
        // Autoplay can still be refused; the poster stays up if so.
        if (attempt) attempt.catch(() => {});
      };

      ScrollTrigger.create({
        trigger: video,
        start: "top 120%",
        end: "bottom -20%",
        onEnter: play,
        onEnterBack: play,
        onLeave: () => video.pause(),
        onLeaveBack: () => video.pause(),
      });
    });

    /* --- Hamburger appears once you've scrolled --------------------------- */
    ScrollTrigger.create({
      start: "top -30%",
      onToggle: (self) => options.onScrolled?.(self.isActive),
    });

    if (reduced) return;

    /* --- Footer: the rounded divider flattens as it arrives ----------------
       Both footer variants get this: the default one and the case pages'
       next-case footer, which is why the selector matches either class. */
    const footerWrap = document.querySelector(".footer-footer-wrap, .footer-case-wrap");
    const roundedWrap = document.querySelector(".footer-rounded-div .rounded-div-wrap");
    if (footerWrap && roundedWrap) {
      gsap.to(roundedWrap, {
        height: 0,
        ease: "none",
        scrollTrigger: {
          trigger: footerWrap,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0,
        },
      });
      const footerArrow = document.querySelector(".footer-footer-wrap footer .arrow");
      if (footerArrow) {
        gsap.from(footerArrow, {
          rotate: 15,
          ease: "none",
          scrollTrigger: {
            trigger: footerWrap,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0,
          },
        });
      }
    }

    /* --- Header arrow rotates through the hero ----------------------------- */
    const homeHeader = document.querySelector(".home-header");
    const homeArrow = document.querySelector(".home-header .arrow");
    if (homeHeader && homeArrow && window.innerWidth > 720) {
      gsap.to(homeArrow, {
        rotate: 90,
        ease: "none",
        scrollTrigger: {
          trigger: homeHeader,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 0,
        },
      });
    }

    /* --- About: arrow tilt + ground shifts to light grey -------------------- */
    const aboutImage = document.querySelector(".about-image .single-about-image");
    const aboutArrow = document.querySelector(".about-image .arrow");
    if (aboutImage && aboutArrow && window.innerWidth > 720) {
      gsap.to(aboutArrow, {
        rotate: 60,
        ease: "none",
        scrollTrigger: {
          trigger: aboutImage,
          start: "15% bottom",
          end: "bottom top",
          scrub: 0,
        },
      });
    }

    const aboutServices = document.querySelector(".about-services");
    if (aboutServices && window.innerWidth > 720) {
      const grounds = document.querySelectorAll(
        ".about-header, .line-globe, .about-image, .about-services"
      );
      gsap.fromTo(
        grounds,
        { backgroundColor: "#FFFFFF" },
        {
          backgroundColor: "#E9EAEB",
          ease: "none",
          scrollTrigger: {
            trigger: aboutServices,
            start: "-25% bottom",
            end: "bottom bottom",
            scrub: 0,
          },
        }
      );
    }

    /* --- The orbit mark keeps turning as you scroll ------------------------- */
    const globes = document.querySelectorAll(".digital-ball .globe");
    if (globes.length && window.innerWidth > 720) {
      gsap.to(globes, {
        rotate: 90,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0,
        },
      });
    }

    /* --- Home: the two rows of tiles drift in opposite directions ----------- */
    const drift = document.querySelector(".horizontal-items");
    if (drift && window.innerWidth > 540) {
      gsap.fromTo(
        drift.querySelector(".row-1"),
        { x: "-6vw" },
        {
          x: "6vw",
          ease: "none",
          scrollTrigger: { trigger: drift, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
      gsap.fromTo(
        drift.querySelector(".row-2"),
        { x: "6vw" },
        {
          x: "-6vw",
          ease: "none",
          scrollTrigger: { trigger: drift, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }
  }, root);

  ScrollTrigger.refresh();

  return {
    revert: () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    },
  };
}
