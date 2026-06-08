import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "AI-Powered DevOps Assistant",
    category:
      "RAG-based operations co-pilot for runbooks, logs, incidents, and deployment guidance.",
    tools:
      "LLMs, LangChain, Vector Search, Docker, Kubernetes, Slack-style integrations",
    image: "/images/work-architecture-01.png",
    link: "https://github.com/musz2",
  },
  {
    title: "Kubernetes CI/CD Release Platform",
    category:
      "Automated multi-stage delivery pipeline for containerized services with rollout validation.",
    tools: "GitHub, Jenkins, Docker, Helm, Kubernetes, rollout validation",
    image: "/images/work-architecture-02.png",
    link: "https://github.com/musz2",
  },
  {
    title: "Highly Available AWS Web Platform",
    category:
      "Production-ready cloud architecture with secure networking, load balancing, and autoscaling.",
    tools: "VPC, ALB, EC2, Auto Scaling, Route 53, Terraform",
    image: "/images/work-architecture-03.png",
    link: "https://github.com/musz2",
  },
  {
    title: "Observability & Reliability Command Center",
    category:
      "Monitoring, alerting, and log analytics layer for cloud-native workloads and reliability checks.",
    tools: "Prometheus, Grafana, Alertmanager, Loki / ELK, exporters, SLO tracking",
    image: "/images/work-architecture-04.png",
    link: "https://github.com/musz2",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const project = projects[currentIndex];

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 260);
    },
    [currentIndex, isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="work-showcase">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>

          <div className={`work-panel ${isAnimating ? "work-panel-changing" : ""}`}>
            <div className="work-copy">
              <div className="carousel-info">
                <div className="carousel-number">
                  <h3>{String(currentIndex + 1).padStart(2, "0")}</h3>
                </div>

                <div className="carousel-details">
                  <h4>{project.title}</h4>
                  <p className="carousel-category">{project.category}</p>
                  <div className="carousel-tools">
                    <span className="tools-label">Tools & Features</span>
                    <p>{project.tools}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="carousel-image-wrapper">
              <WorkImage
                image={project.image}
                alt={project.title}
                link={project.link}
              />
            </div>
          </div>

          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
