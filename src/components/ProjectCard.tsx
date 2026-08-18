import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import "./styles/Work.css";
import type { Project } from "../data/projects";

/** Three deliberately different weights, so the section reads as a ranked
 *  index rather than a uniform card grid:
 *  - featured  — full-bleed hero shot, then a split meta block
 *  - showcase  — large alternating media/copy pair
 *  - compact   — 2-up secondary work */
export type CardVariant = "featured" | "showcase" | "compact";

interface Props {
  project: Project;
  index: number;
  variant: CardVariant;
  /** Showcase rows alternate which side the media sits on. */
  mirrored?: boolean;
  onOpen: (project: Project) => void;
}

const ProjectCard = ({ project, index, variant, mirrored, onOpen }: Props) => {
  const [showAlt, setShowAlt] = useState(false);
  const number = String(index + 1).padStart(2, "0");

  const stackLimit = variant === "compact" ? 4 : variant === "showcase" ? 6 : 8;
  const extra = project.tech.length - stackLimit;

  const media = (
    <button
      type="button"
      className={`pc-media pc-tone-${project.tone} pc-fit-${
        project.fit ?? "cover"
      }`}
      onClick={() => onOpen(project)}
      onPointerEnter={() => setShowAlt(true)}
      onPointerLeave={() => setShowAlt(false)}
      data-cursor="disable"
      aria-label={`Open the ${project.title} case study`}
      tabIndex={-1}
    >
      <span className="pc-frame" data-reveal>
        <img
          className="pc-img"
          src={project.image}
          alt={project.alt}
          loading={variant === "featured" ? "eager" : "lazy"}
          // React 18 does not map the camelCase prop, so pass the attribute.
          {...{ fetchpriority: variant === "featured" ? "high" : "auto" }}
          decoding="async"
          draggable={false}
        />
        {project.imageAlt && (
          <img
            className={`pc-img pc-img-alt ${showAlt ? "is-on" : ""}`}
            src={project.imageAlt}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        )}
      </span>

      {project.imageAltLabel && (
        <span className="pc-tag">{project.imageAltLabel}</span>
      )}

      <span className="pc-cta" aria-hidden="true">
        View case study <MdArrowOutward />
      </span>
    </button>
  );

  const copy = (
    <div className="pc-body">
      <div className="pc-meta">
        <span className="pc-num">{number}</span>
        <span className="pc-rule" aria-hidden="true" />
        <span className="pc-kind">{project.kind}</span>
        <span className="pc-year">{project.year}</span>
      </div>

      <h3 className="pc-title">
        <button
          type="button"
          className="pc-title-btn"
          onClick={() => onOpen(project)}
          data-cursor="disable"
        >
          <span className="pc-title-text">{project.title}</span>
          <MdArrowOutward className="pc-title-arrow" aria-hidden="true" />
        </button>
      </h3>

      <p className="pc-tagline">{project.tagline}</p>

      {variant !== "compact" && (
        <p className="pc-summary">{project.overview}</p>
      )}

      {variant !== "compact" && project.role && (
        <p className="pc-role">
          <span>Role</span>
          {project.role}
        </p>
      )}

      <ul className="pc-stack" aria-label={`${project.title} technologies`}>
        {project.tech.slice(0, stackLimit).map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
        {extra > 0 && <li className="pc-stack-more">+{extra} more</li>}
      </ul>

      <div className="pc-actions">
        <button
          type="button"
          className="btn btn-solid"
          onClick={() => onOpen(project)}
          data-cursor="disable"
        >
          Case study
        </button>

        {project.live ? (
          <a
            className="btn"
            href={project.live}
            target="_blank"
            rel="noreferrer"
            data-cursor="disable"
          >
            Live <MdArrowOutward aria-hidden="true" />
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
            GitHub <MdArrowOutward aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );

  return (
    <article
      className={`pc pc-${variant}${mirrored ? " pc-mirrored" : ""}`}
      data-project-card
    >
      {media}
      {copy}
    </article>
  );
};

export default ProjectCard;
