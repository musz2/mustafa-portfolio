import { useEffect, useRef } from "react";
import { MdArrowOutward, MdClose } from "react-icons/md";
import "./styles/Work.css";
import type { Project } from "../data/projects";

interface Props {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: Props) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const dark = project.tone === "dark" ? "pm-dark" : "";

  return (
    <div className="pm-backdrop" onClick={onClose} data-cursor="disable">
      <div
        className="pm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pm-title"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="pm-close"
          onClick={onClose}
          ref={closeRef}
          aria-label="Close case study"
          data-cursor="disable"
        >
          <MdClose />
        </button>

        <div className="pm-scroll">
          <div className={`pm-hero ${dark}`}>
            <img src={project.image} alt={project.alt} decoding="async" />
          </div>

          <div className="pm-body">
            <header className="pm-head">
              <span className="pm-kind">
                {project.kind} · {project.year}
              </span>
              <h2 id="pm-title">{project.title}</h2>
              <p>{project.tagline}</p>
            </header>

            <section className="pm-block">
              <h4>Purpose</h4>
              <p>{project.overview}</p>
            </section>

            {project.role && (
              <section className="pm-block">
                <h4>My role</h4>
                <p>{project.role}</p>
              </section>
            )}

            {project.engineering && project.engineering.length > 0 && (
              <section className="pm-block">
                <h4>Architecture</h4>
                <ul className="pm-list">
                  {project.engineering.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {project.challenges && project.challenges.length > 0 && (
              <section className="pm-block">
                <h4>Challenges</h4>
                <ul className="pm-list">
                  {project.challenges.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="pm-block">
              <h4>Technologies</h4>
              <ul className="pm-tech">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </section>

            {project.imageAlt && (
              <section className="pm-block">
                <h4>{project.imageAltLabel ?? "Detail"}</h4>
                <div className={`pm-shot ${dark}`}>
                  <img
                    src={project.imageAlt}
                    alt={`${project.title} — ${
                      project.imageAltLabel ?? "additional view"
                    }`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </section>
            )}

            <div className="pm-actions">
              {project.live ? (
                <a
                  className="btn btn-solid"
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                >
                  Live <MdArrowOutward />
                </a>
              ) : (
                <span className="btn-note">{project.liveNote}</span>
              )}

              {project.repo && (
                <a
                  className="btn"
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                >
                  GitHub <MdArrowOutward />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
