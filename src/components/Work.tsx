import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Work.css";
import { projects, type Project } from "../data/projects";
import ProjectRow from "./ProjectRow";
import ProjectModal from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger);

const [flagship, aurora, jsam, ...compact] = projects;

const Work = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-project-row]").forEach((row) => {
        const frame = row.querySelector<HTMLElement>("[data-reveal]");
        const image = row.querySelector<HTMLElement>(".pr-media-img");

        // Entrance: transform + opacity only, and it runs once.
        gsap.fromTo(
          row,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          }
        );

        if (frame) {
          gsap.fromTo(
            frame,
            { clipPath: "inset(14% 8% 14% 8% round 18px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 18px)",
              duration: 1.15,
              ease: "power3.out",
              scrollTrigger: { trigger: row, start: "top 85%", once: true },
            }
          );
        }

        // Parallax rides GSAP's single ticker via scrub — no extra rAF loop.
        if (image) {
          gsap.fromTo(
            image,
            { yPercent: 0 },
            {
              yPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openProject = useCallback((project: Project) => setActive(project), []);
  const closeProject = useCallback(() => setActive(null), []);

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <header className="work-head">
          <h2>
            Selected <span>Work</span>
          </h2>
          <p>Systems, products &amp; experiences I've built.</p>
        </header>

        <ProjectRow
          project={flagship}
          index={0}
          variant="flagship"
          onOpen={openProject}
        />

        <ProjectRow
          project={aurora}
          index={1}
          variant="wide"
          onOpen={openProject}
        />

        <ProjectRow
          project={jsam}
          index={2}
          variant="wide"
          mirrored
          onOpen={openProject}
        />

        <div className="work-pair">
          {compact.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i + 3}
              variant="compact"
              onOpen={openProject}
            />
          ))}
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={closeProject} />}
    </div>
  );
};

export default Work;
