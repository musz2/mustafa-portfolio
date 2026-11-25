import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type MouseEvent,
  useState,
  type PropsWithChildren,
} from "react";
import { startScroll, stopScroll } from "../lib/smoothScroll";

interface NavValue {
  open: boolean;
  toggle: (event: MouseEvent<HTMLButtonElement>) => void;
  close: () => void;
}

const NavContext = createContext<NavValue | null>(null);

export function NavProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const opener = useRef<HTMLButtonElement | null>(null);
  const close = useCallback(() => setOpen(false), []);
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    if (!open) opener.current = event.currentTarget;
    setOpen(!open);
  };

  useEffect(() => {
    if (!open) return;
    stopScroll("menu");
    document.querySelector<HTMLButtonElement>(".btn-hamburger button")?.focus({ preventScroll: true });
    const closeOnBack = () => setOpen(false);
    window.addEventListener("popstate", closeOnBack);
    return () => {
      window.removeEventListener("popstate", closeOnBack);
      startScroll("menu");
      if (opener.current?.isConnected) opener.current.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = { open, toggle, close };

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used inside NavProvider");
  return ctx;
}
