import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { BtnRound } from "../components/Btn";
import Arrow from "../components/Arrow";
import DeviceFrame from "../components/DeviceFrame";
import BrowserFrame from "../components/BrowserFrame";
import { nextProject, type Project } from "../data/projects";

/** The address shown in the browser chrome. */
function domainOf(project: Project) {
  const url = project.live ?? project.repo ?? "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "") || project.title.toLowerCase();
}

type BlockItem = {
  src: string;
  alt: string;
  video: string;
  frame?: "laptop" | "browser";
  tone?: string;
};

/**
 * One page of the site, recorded. `laptop` seats the take in the device frame;
 * `plain` runs it bare and inset, the way the reference alternates them.
 */
function Block({
  project,
  item,
  last,
  first,
}: {
  project: Project;
  item: BlockItem;
  last: boolean;
  first: boolean;
}) {
  const browser = item.frame === "browser";
  const media = (
    <div className="overlay overlay-image playpauze">
      <video
        className="overlay"
        src={item.video}
        poster={item.src}
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={item.alt}
      />
    </div>
  );

  return (
    <section
      className={`section single-block block-device${last ? " block-padding-bottom" : ""}`}
      style={{ backgroundColor: item.tone ?? project.blockTone }}
    >
      <div className="container">
        {first && (project.live || project.repo) && (
          <div className="btn-wrap theme-dark">
            <BtnRound href={project.live ?? project.repo ?? "#"}>
              {project.live
                ? project.liveLabel ?? "Live site"
                : project.repoLabel ?? "View code"}
              <Arrow />
            </BtnRound>
          </div>
        )}
        <div className={`row ${browser ? "device-browser" : "device-row"}`}>
          <div className="flex-col">
            {browser ? (
              <BrowserFrame domain={domainOf(project)}>
                <div className="single-image">{media}</div>
              </BrowserFrame>
            ) : (
              <div className="device">
                <div className="single-image">{media}</div>
                <div className="overlay-device-image">
                  <DeviceFrame />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * A case page is the work, shown: the project's icon and name, then one
 * recording per page of the real site. No stills, no write-up.
 */
export default function ProjectPage({ project }: { project: Project }) {
  const next = nextProject(project.slug);
  const blocks: BlockItem[] = project.gallery ?? [];

  return (
    <>
      <section className="section case-top-wrap theme-dark">
        <header className="section default-header case-header">
          <NavBar />
          <div className="container medium once-in">
            <div className="row">
              <div className="flex-col">
                <div className="case-title">
                  <span
                    className="case-icon"
                    role="img"
                    aria-label={project.iconAlt}
                    style={{ backgroundImage: `url(${project.icon})` }}
                  />
                  <h1>{project.title}</h1>
                </div>
                <p className="case-tagline">{project.tagline}</p>
              </div>
            </div>
          </div>
        </header>

        <section className="section case-intro once-in">
          <div className="container medium">
            <div className="row">
              <div className="flex-col">
                <h5>Role / Services</h5>
                <div className="stripe" />
                <p>{project.services}</p>
              </div>
              <div className="flex-col">
                <h5>Credits</h5>
                <div className="stripe" />
                <p>{project.credits}</p>
              </div>
              <div className="flex-col">
                <h5>Location &amp; year</h5>
                <div className="stripe" />
                <p>
                  {project.location} &copy; {project.year}
                </p>
              </div>
            </div>
          </div>
        </section>

      </section>

      {blocks.map((item, index) => (
        <Block
          key={item.src}
          project={project}
          item={item}
          first={index === 0}
          last={index === blocks.length - 1}
        />
      ))}

      <Footer nextCase={next} />
    </>
  );
}
