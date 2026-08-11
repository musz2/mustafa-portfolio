import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import "./styles/Work.css";
import type { Project } from "../data/projects";

export type RowVariant = "flagship" | "wide" | "compact";

interface Props {
  project: Project;
  index: number;
  variant: RowVariant;
  /** Wide rows alternate which side the media sits on. */
  mirrored?: boolean;
  onOpen: (project: Project) => void;
}

const ProjectRow = ({
  project,
  index,
  variant,
  mirrored,
  onOpen,
}: Props) => {
  const [showAlt, setShowAlt] = useState(false);
  const number = String(index + 1).padStart(2, "0");

  const media = (
    <button
      type="button"
      className={`pr-media pr-media-${project.tone} pr-fit-${
        project.fit ?? "cover"
      }`}
      onClick={() => onOpen(project)}
      onPointerEnter={() => setShowAlt(true)}
      onPointerLeave={() => setShowAlt(false)}
      data-cursor="disable"
      aria-label={`Open case study for ${project.title}`}
    >
      <span className="pr-media-frame" data-reveal>
        <img
          className="pr-media-img"
          src={project.image}
          alt={project.alt}
          loading={variant === "flagship" ? "eager" : "lazy"}
          fetchPriority={variant === "flagship" ? "high" : "auto"}
          decoding="async"
          draggable={false}
        />
        {project.imageAlt && (
          <img
            className={`pr-media-img pr-media-alt ${
              showAlt ? "is-on" : ""
            }`}
            src={project.imageAlt}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        )}
        <span className="pr-media-sheen" aria-hidden="true" />
      </span>

      <span className="pr-open">
        Case study <MdArrowOutward />
      </span>

      {project.imageAltLabel && (
        <span className="pr-alt-tag">{project.imageAltLabel}</span>
      )}
    </button>
  );

  const copy = (
    <div className="pr-copy">
      <div className="pr-eyebrow">
        <span className="pr-num">{number}</span>
        <span className="pr-kind">{project.kind}</span>
      </div>

      <h3 className="pr-title">{project.title}</h3>
      <p className="pr-tagline">{project.tagline}</p>

      {variant === "flagship" && (
        <p className="pr-summary">{project.overview}</p>
      )}

      <ul className="pr-stack" aria-label={`${project.title} stack`}>
        {project.tech
          .slice(0, variant === "flagship" ? 6 : 4)
          .map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
      </ul>

      <div className="pr-actions">
        <button
          type="button"
          className="pr-btn pr-btn-solid"
          onClick={() => onOpen(project)}
          data-cursor="disable"
        >
          Case Study
        </button>

        {project.live ? (
          <a
            className="pr-btn"
            href={project.live}
            target="_blank"
            rel="noreferrer"
            data-cursor="disable"
          >
            Live <MdArrowOutward />
          </a>
        ) : (
          <span className="pr-note">{project.liveNote}</span>
        )}

        {project.repo && (
          <a
            className="pr-btn"
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
  );

  return (
    <article
      className={`pr pr-${variant} ${mirrored ? "pr-mirrored" : ""}`}
      data-project-row
    >
      {variant === "flagship" ? (
        <>
          {copy}
          {media}
        </>
      ) : (
        <>
          {media}
          {copy}
        </>
      )}
    </article>
  );
};

export default ProjectRow;
