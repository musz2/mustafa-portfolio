import { projects } from "../data/projects";
import Arrow from "./Arrow";

/**
 * Trailing cursor layers. The preview stack holds every project in work order
 * so hovering row *n* slides the stack to tile *n*.
 */
export default function Cursor() {
  return (
    <div aria-hidden="true">
      <div className="mouse-pos-list-image no-select">
        <div className="mouse-pos-list-image-bounce overlay">
          <div className="float-image-wrap">
            {projects.map((project) => (
              <div key={project.slug} className="mouse-pos-list-image-inner">
                <div
                  className="overlay overlay-image"
                  style={{
                    backgroundColor: "transparent",
                    backgroundImage: `url(${project.icon})`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mouse-pos-list-btn no-select" />
      <div className="mouse-pos-list-span no-select">
        <p>
          View
          <Arrow />
        </p>
      </div>
    </div>
  );
}
