import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <div className="contact-heading-row">
          <h3>Contact</h3>
          <p>
            Open to DevOps, Cloud Infrastructure, CI/CD, Kubernetes, and
            automation-focused opportunities.
          </p>
        </div>

        <div className="contact-open-grid">
          <div className="contact-column contact-profile">
            <span className="contact-label">Profile</span>
            <h2>
              DevOps Engineer / Cloud Engineer focused on reliable systems,
              clean automation, and production-ready infrastructure.
            </h2>
          </div>

          <div className="contact-column">
            <span className="contact-label">Connect</span>
            <a
              href="mailto:alisyedmustafa28@gmail.com"
              data-cursor="disable"
              className="contact-line"
            >
              alisyedmustafa28@gmail.com <MdArrowOutward />
            </a>
            <a
              href="tel:+917995370881"
              data-cursor="disable"
              className="contact-line"
            >
              +91 7995370881 <MdArrowOutward />
            </a>
            <p className="contact-muted">Hyderabad, India</p>
          </div>

          <div className="contact-column contact-socials">
            <span className="contact-label">Social</span>
            <a
              href="https://github.com/musz2"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://linkedin.com/in/mustafa28"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="/Syed_Mustafa_Ali_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Resume <MdArrowOutward />
            </a>
          </div>
        </div>

        <div className="contact-bottom-bar">
          <p>
            <MdCopyright /> 2026 Syed Mustafa Ali
          </p>
          <p>Designed for DevOps, Cloud, and Automation roles.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
