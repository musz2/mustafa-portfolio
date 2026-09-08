import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { RouterProvider, useRouter } from "./router/Router";
import { NavProvider, useNav } from "./components/NavContext";
import LoadingScreen from "./components/LoadingScreen";
import Hamburger from "./components/Hamburger";
import FixedNav from "./components/FixedNav";
import Cursor from "./components/Cursor";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";
import { projectBySlug } from "./data/projects";
import { site } from "./data/site";
import { initSmoothScroll } from "./lib/smoothScroll";
import { initScrollEffects } from "./lib/scrollEffects";
import { initMagnetic } from "./lib/magnetic";
import { initCursor } from "./lib/cursor";
import { pageTransitionOut, runHomeLoader, runPageLoader } from "./lib/transitions";
import { ScrollTrigger, isTouch } from "./lib/gsap";

const titles: Record<string, string> = {
  "/": site.metaTitle,
  "/work": `Work — ${site.name}`,
  "/about": `About — ${site.name}`,
  "/contact": `Contact — ${site.name}`,
};

function resolve(path: string) {
  if (path === "/") return { key: "home", node: <Home /> };
  if (path === "/work") return { key: "work", node: <Work /> };
  if (path === "/about") return { key: "about", node: <About /> };
  if (path === "/contact") return { key: "contact", node: <Contact /> };

  if (path.startsWith("/work/")) {
    const project = projectBySlug(path.slice("/work/".length));
    if (project) {
      return { key: project.slug, node: <ProjectPage project={project} />, project };
    }
  }
  return { key: "404", node: <NotFound /> };
}

function Shell() {
  const { path } = useRouter();
  const { open } = useNav();
  const mainRef = useRef<HTMLElement>(null);
  const lastPath = useRef<string | null>(null);
  const [showGreetings, setShowGreetings] = useState(() => window.location.pathname === "/");
  const [scrolled, setScrolled] = useState(false);
  const [touch] = useState(isTouch);

  const route = resolve(path);

  /* --- Viewport unit that survives mobile browser chrome ------------------ */
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);

  /* --- One smooth-scroll instance for the session ------------------------- */
  useEffect(() => {
    const stop = initSmoothScroll();
    return () => stop?.();
  }, []);

  /* --- Per-page: rebuild every scroll trigger and pointer behaviour -------- */
  useLayoutEffect(() => {
    const root = mainRef.current;
    if (!root) return;

    const effects = initScrollEffects(root, { onScrolled: setScrolled });
    const stopMagnetic = initMagnetic(root);
    const stopCursor = initCursor(root);

    if (lastPath.current === null) {
      lastPath.current = path;
      const loader = path === "/" ? runHomeLoader() : runPageLoader();
      loader.eventCallback("onComplete", () => setShowGreetings(false));
    } else if (lastPath.current !== path) {
      lastPath.current = path;
      pageTransitionOut();
    }

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      stopCursor();
      stopMagnetic();
      effects.revert();
    };
  }, [path]);

  /* --- Document title ------------------------------------------------------ */
  useEffect(() => {
    const named = titles[path];
    if (named) {
      document.title = named;
      return;
    }
    const project = path.startsWith("/work/") ? projectBySlug(path.slice(6)) : undefined;
    document.title = project
      ? `${project.title} — ${site.name}`
      : `Not found — ${site.name}`;
  }, [path]);

  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <LoadingScreen home={showGreetings} />
      <main
        ref={mainRef}
        className={[
          "main",
          touch ? "touch" : "no-touch",
          scrolled ? "scrolled" : "",
          open ? "nav-active" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        id={route.key}
      >
        <Cursor />
        <Hamburger />
        <FixedNav />
        <div className="main-wrap" id="content" key={route.key}>
          {route.node}
        </div>
      </main>
    </>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <NavProvider>
        <Shell />
      </NavProvider>
    </RouterProvider>
  );
}
