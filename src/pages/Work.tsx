import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { BtnToggle } from "../components/Btn";
import { WorkRows, WorkTiles } from "../components/WorkList";
import { filters, projects, type FilterId, type Project } from "../data/projects";
import { ScrollTrigger } from "../lib/gsap";
import { scrollToTop, startScroll, stopScroll } from "../lib/smoothScroll";

type View = "rows" | "columns";

const VIEW_KEY = "work-view";

const RowsIcon = () => (
  <svg width="20" height="19" viewBox="0 0 20 19" aria-hidden="true">
    <g fill="currentColor" fillRule="evenodd">
      <path d="M0 6h20v1H0zM0 0h20v1H0zM0 12h20v1H0zM0 18h20v1H0z" />
    </g>
  </svg>
);

const ColumnsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
    <g fill="currentColor" fillRule="nonzero">
      <path d="M8 0H0v8h8V0zM7 1v6H1V1h6zM8 12H0v8h8v-8zm-1 1v6H1v-6h6zM20 0h-8v8h8V0zm-1 1v6h-6V1h6zM20 12h-8v8h8v-8zm-1 1v6h-6v-6h6z" />
    </g>
  </svg>
);

export default function Work() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [view, setView] = useState<View>(() => {
    try {
      return localStorage.getItem(VIEW_KEY) === "columns" ? "columns" : "rows";
    } catch {
      return "rows";
    }
  });
  /** Drives the out/in classes while a view or filter swaps. */
  const [phase, setPhase] = useState<"" | "out" | "in">("");
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(window.clearTimeout);
    },
    []
  );

  /**
   * Fade the grid down, jump to the top, swap, then let it settle — the same
   * 300 / 700ms choreography the reference runs on both switches.
   */
  const swap = useCallback((apply: () => void) => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];

    setPhase("out");
    stopScroll();

    timers.current.push(
      window.setTimeout(() => {
        apply();
        scrollToTop();
        setPhase("in");
      }, 300),
      window.setTimeout(() => {
        setPhase("");
        ScrollTrigger.refresh();
        startScroll();
      }, 700)
    );
  }, []);

  const chooseFilter = (next: FilterId) => {
    if (next === filter) return;
    swap(() => setFilter(next));
  };

  const chooseView = (next: View) => {
    if (next === view) return;
    swap(() => {
      setView(next);
      try {
        localStorage.setItem(VIEW_KEY, next);
      } catch {
        /* storage can be unavailable; the view just won't persist */
      }
    });
  };

  const shown = useMemo(
    () => (project: Project) =>
      filter === "all" ||
      project.categories.includes(filter as Exclude<FilterId, "all">),
    [filter]
  );

  const counts = useMemo(
    () =>
      Object.fromEntries(
        filters.map((entry) => [
          entry.id,
          entry.id === "all"
            ? projects.length
            : projects.filter((project) =>
                project.categories.includes(entry.id as Exclude<FilterId, "all">)
              ).length,
        ])
      ) as Record<FilterId, number>,
    []
  );

  const fade =
    phase === "out" ? " grid-fade-out" : phase === "in" ? " grid-fade-in" : "";

  return (
    <>
      <header className="section default-header work-header">
        <NavBar />
        <div className="container medium">
          <div className="row">
            <div className="flex-col once-in">
              <h1>
                <span>Infrastructure, pipelines</span>{" "}
                <span>and products that ship</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section className="section work-filters">
        <div className="container once-in">
          <div className="filter-row">
            <div className="toggle-row">
              {filters.map((entry) => (
                <BtnToggle
                  key={entry.id}
                  active={filter === entry.id}
                  onClick={() => chooseFilter(entry.id)}
                >
                  {entry.label}
                  {entry.id !== "all" && (
                    <span className="count-nr">{counts[entry.id]}</span>
                  )}
                </BtnToggle>
              ))}
            </div>

            <div className="grid-row">
              <BtnToggle
                className="btn-icon"
                active={view === "rows"}
                onClick={() => chooseView("rows")}
                label="List view"
              >
                <RowsIcon />
              </BtnToggle>
              <BtnToggle
                className="btn-icon"
                active={view === "columns"}
                onClick={() => chooseView("columns")}
                label="Grid view"
              >
                <ColumnsIcon />
              </BtnToggle>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap section-wrap-work once-in">
        <section
          className={`section work-grid small-work-grid grid-fade grid-rows-part${
            view === "rows" ? " visible" : ""
          }${fade}`}
        >
          <div className="container">
            <div className="grid-sub-title">
              <div className="flex-col">
                <h5>Project</h5>
              </div>
              <div className="flex-col">
                <h5>Context</h5>
              </div>
              <div className="flex-col">
                <h5>Services</h5>
              </div>
              <div className="flex-col">
                <h5>Year</h5>
              </div>
            </div>
            <WorkRows items={projects} shown={shown} variant="small" />
          </div>
        </section>

        <section
          className={`section work-tiles grid-fade grid-columns-part${
            view === "columns" ? " visible" : ""
          }${fade}`}
        >
          <div className="container">
            <WorkTiles items={projects} shown={shown} />
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
}
