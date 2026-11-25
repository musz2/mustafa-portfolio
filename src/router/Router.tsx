import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { delay, pageTransitionIn, routeCoverMs } from "../lib/transitions";
import { setScrollPosition, startScroll } from "../lib/smoothScroll";

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
  const current = useRef(path);
  const entry = useRef<number>(window.history.state?.portfolioEntry ?? 0);
  const positions = useRef(new Map<number, number>());
  const destinationScroll = useRef<number | null>(null);
  const generation = useRef(0);
  const pending = useRef(false);
  const curtain = useRef<ReturnType<typeof pageTransitionIn> | null>(null);

  useLayoutEffect(() => {
    if (destinationScroll.current === null) return;
    setScrollPosition(destinationScroll.current);
    destinationScroll.current = null;
    document.getElementById("content")?.focus({ preventScroll: true });
  }, [path]);

  const go = useCallback(async (to: string, label: string, push: boolean) => {
    const next = normalise(to);
    if (push && (pending.current || next === current.current)) return;
    const request = ++generation.current;
    if (next === current.current) {
      pending.current = false;
      startScroll();
      return;
    }

    pending.current = true;
    positions.current.set(entry.current, window.scrollY);
    setTransitionLabel(label);
    await delay(20);
    if (request !== generation.current) return;
    curtain.current?.kill();
    curtain.current = pageTransitionIn();
    await delay(routeCoverMs());
    if (request !== generation.current) return;

    if (push) {
      entry.current = Date.now();
      window.history.pushState({ portfolioEntry: entry.current }, "", next);
    } else {
      entry.current = window.history.state?.portfolioEntry ?? 0;
    }
    destinationScroll.current = push ? 0 : positions.current.get(entry.current) ?? 0;
    current.current = next;
    setPath(next);
    pending.current = false;
  }, []);

  const navigate = useCallback(
    (to: string, label?: string) => {
      void go(to, label ?? "Loading", true);
    },
    [go]
  );

  useEffect(() => {
    const restoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const onPop = () => {
      void go(window.location.pathname, "Loading", false);
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.history.scrollRestoration = restoration;
      window.removeEventListener("popstate", onPop);
    };
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
