import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>System Engineer</h4>
                <h5>The Career Insights</h5>
              </div>
              <div className="career-period">
                <strong>2026</strong>
                <span>Present</span>
              </div>
            </div>
            <p>
              Supporting Linux and cloud infrastructure, deployment workflows,
              environment reliability, monitoring, and automation initiatives
              across internal platforms and technical delivery operations.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Associate Engineer</h4>
                <h5>Wipro</h5>
              </div>
              <div className="career-period">
                <strong>2024</strong>
                <span>2026</span>
              </div>
            </div>
            <p>
              Worked in a structured enterprise environment handling production
              support, system troubleshooting, operational monitoring, and
              process-driven technical execution for business-critical systems.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech IT</h4>
                <h5>Shadan College of Engineering</h5>
              </div>
              <div className="career-period">
                <strong>2024</strong>
                <span>Graduate</span>
              </div>
            </div>
            <p>
              Graduated in Information Technology with academic foundations in
              computer systems, networking, databases, programming, and modern
              software engineering practices.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Current Focus</h4>
                <h5>DevOps, Cloud & Automation</h5>
              </div>
              <div className="career-period">
                <strong>Now</strong>
                <span>Building</span>
              </div>
            </div>
            <p>
              Building hands-on projects around CI/CD, container orchestration,
              infrastructure as code, monitoring, and AI-powered DevOps
              assistants to strengthen production-ready engineering depth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
