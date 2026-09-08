import { SmartLink } from "./Btn";
import { projects, type Project } from "../data/projects";

interface WorkRowsProps {
  /** Every project renders; `shown` decides which collapse. */
  items: Project[];
  shown?: (project: Project) => boolean;
  variant: "large" | "small";
}

const indexOf = (project: Project) =>
  projects.findIndex((item) => item.slug === project.slug);

/**
 * The typographic list of projects. `large` is the home page's four-line
 * version; `small` is the four-column table on the work page.
 */
export function WorkRows({ items, shown, variant }: WorkRowsProps) {
  return (
    <ul className="work-items mouse-pos-list-image-wrap">
      {items.map((project) => (
        <li
          key={project.slug}
          data-index={indexOf(project)}
          className={!shown || shown(project) ? "visible" : undefined}
        >
          <div className="stripe animate" />
          <SmartLink
            href={`/work/${project.slug}`}
            label={project.title}
            className="row"
            magnetic={false}
          >
            <div className="flex-col">
              <h4>
                <span>{project.title}</span>
              </h4>
            </div>
            {variant === "small" && (
              <div className="flex-col animate">
                <p>{project.location}</p>
              </div>
            )}
            <div className="flex-col animate">
              <p>{project.services}</p>
            </div>
            {variant === "small" && (
              <div className="flex-col animate">
                <p>{project.year}</p>
              </div>
            )}
          </SmartLink>
        </li>
      ))}
      <li className="stripe last animate" aria-hidden="true" />
    </ul>
  );
}

/** Square-preview cards — the layout the row list collapses to on tablet and phone. */
export function WorkTiles({
  items,
  shown,
}: {
  items: Project[];
  shown?: (project: Project) => boolean;
}) {
  return (
    <ul>
      {items.map((project) => (
        <li
          key={project.slug}
          className={!shown || shown(project) ? "visible" : undefined}
        >
          <div className="single-tile-wrap">
            <SmartLink
              href={`/work/${project.slug}`}
              label={project.title}
              className="row"
              magnetic={false}
            >
              <div className="flex-col">
                <div className="tile-image">
                  <div
                    className="overlay overlay-image"
                    role="img"
                    aria-label={`${project.title} — ${project.tagline}`}
                    style={{
                      backgroundColor: project.tone,
                      backgroundImage: `url(${project.tile})`,
                    }}
                  />
                </div>
              </div>
              <div className="flex-col">
                <h4>
                  <span>{project.title}</span>
                </h4>
                <div className="stripe" />
              </div>
              <div className="flex-col">
                <p>{project.services}</p>
              </div>
              <div className="flex-col">
                <p>{project.year}</p>
              </div>
            </SmartLink>
          </div>
        </li>
      ))}
    </ul>
  );
}
