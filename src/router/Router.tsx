import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { delay, pageTransitionIn } from "../lib/transitions";
import { scrollToTop } from "../lib/smoothScroll";

interface RouterValue {
  path: string;
  /** The word the curtain shows while the next page loads. */
  transitionLabel: string;
  navigate: (to: string, label?: string) => void;
}

const RouterContext = createContext<RouterValue | null>(null);

const normalise = (path: string) =>
  path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;

export function RouterProvider({ children }: PropsWithChildren) {
  const [path, setPath] = useState(() => normalise(window.location.pathname));
  const [transitionLabel, setTransitionLabel] = useState("Home");
  const busy = useRef(false);
  /* `go` is created once, so the path it compares against lives in a ref.
     A popstate that lands on the page already showing (Safari fires them on
     restore) has to bail here: the curtain locks scrolling on the way in and
     only the incoming page's transition releases it, so a navigation that
     never changes the route would leave the lock on for good. */
  const current = useRef(path);

  const go = useCallback(async (to: string, label: string, push: boolean) => {
    const next = normalise(to);
    if (busy.current) return;
    if (next === current.current) return;

    busy.current = true;
    setTransitionLabel(label);

    // Give the curtain a frame with the new word before it sweeps up.
    await delay(20);
    pageTransitionIn();
    await delay(495);

    if (push) window.history.pushState({}, "", next);
    current.current = next;
    setPath(next);
    scrollToTop();
    busy.current = false;
  }, []);

  const navigate = useCallback(
    (to: string, label?: string) => {
      void go(to, label ?? "Loading", true);
    },
    [go]
  );

  useEffect(() => {
    const onPop = () => {
      void go(window.location.pathname, "Loading", false);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [go]);

  const value = useMemo(
    () => ({ path, transitionLabel, navigate }),
    [path, transitionLabel, navigate]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used inside RouterProvider");
  return ctx;
}
