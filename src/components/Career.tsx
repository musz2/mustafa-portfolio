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
                <h4>DevOps Engineer</h4>
                <h5>Debug Tech</h5>
              </div>
              <div className="career-period">
                <strong>May 2026</strong>
                <span>Present</span>
              </div>
            </div>
            <p>
              Managing cloud and infrastructure operations, automating deployment
              and system workflows, and shipping containerized services with
              monitoring and reliability practices built in.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Associate System Engineer</h4>
                <h5>Wipro</h5>
              </div>
              <div className="career-period">
                <strong>Sep 2024</strong>
                <span>May 2026</span>
              </div>
            </div>
            <p>
              Supported enterprise IT infrastructure and operations across Linux,
              networking, and cloud technologies — handling system monitoring,
              troubleshooting, and production support for business-critical
              systems in Hyderabad.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech, Information Technology</h4>
                <h5>Shadan College of Engineering &amp; Technology</h5>
              </div>
              <div className="career-period">
                <strong>2021</strong>
                <span>2024</span>
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
                <h5>Shipping AI Products</h5>
              </div>
              <div className="career-period">
                <strong>Now</strong>
                <span>Building</span>
              </div>
            </div>
            <p>
              Designing, building, and releasing real products — Slacker AI and
              Aurora — across Electron desktop apps, Node services, and
              multi-platform release pipelines, alongside production websites
              for clients and teams.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
