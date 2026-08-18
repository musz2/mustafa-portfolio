import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Work.css";
import { projects, type Project } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger);

const [featured, aurora, jsam, ...secondary] = projects;

const Work = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-work-head] > *",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-work-head]",
            start: "top 88%",
            once: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-project-card]").forEach((card) => {
        const frame = card.querySelector<HTMLElement>("[data-reveal]");

        // Entrance is transform + opacity only, and runs once.
        gsap.fromTo(
          card,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );

        if (frame) {
          gsap.fromTo(
            frame,
            { clipPath: "inset(9% 5% 9% 5% round 16px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 16px)",
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
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
    <section className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <header className="work-head" data-work-head>
          <span className="section-label">Selected work</span>
          <h2>
            Things I have
            <br />
            built and shipped
          </h2>
          <p>
            Products, platforms and infrastructure taken end to end — desktop
            apps and Node services through to storefronts and multi-platform
            release pipelines.
          </p>
        </header>

        <ProjectCard
          project={featured}
          index={0}
          variant="featured"
          onOpen={openProject}
        />

        <ProjectCard
          project={aurora}
          index={1}
          variant="showcase"
          onOpen={openProject}
        />

        <ProjectCard
          project={jsam}
          index={2}
          variant="showcase"
          mirrored
          onOpen={openProject}
        />

        <div className="work-secondary">
          <span className="section-label">Also built</span>
          <div className="work-grid">
            {secondary.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i + 3}
                variant="compact"
                onOpen={openProject}
              />
            ))}
          </div>
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={closeProject} />}
    </section>
  );
};

export default Work;
