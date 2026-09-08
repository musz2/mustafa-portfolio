import Arrow from "../components/Arrow";
import Globe from "../components/Globe";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { career, services, stack } from "../data/site";

export default function About() {
  return (
    <>
      <header className="section default-header about-header">
        <NavBar />
        <div className="container medium once-in">
          <div className="row">
            <div className="flex-col">
              <h1>
                <span>Keeping software</span>{" "}
                <span>running in production</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section className="section no-padding line-globe once-in">
        <div className="container medium">
          <div className="row">
            <div className="flex-col">
              <div className="stripe" />
              <Globe />
            </div>
          </div>
        </div>
      </section>

      <section className="section about-image once-in">
        <div className="bottom-lightgray" aria-hidden="true" />
        <div className="container">
          <div className="row">
            <div className="flex-col">
              <Arrow />
              <p data-speed="-1" data-start="top bottom" data-end="bottom top">
                I am Syed Mustafa Ali, a DevOps and cloud engineer in Hyderabad. My work is the
                unglamorous half of shipping software: Linux hosts, cloud environments,
                containers, deployment pipelines and the monitoring that tells you the truth at
                three in the morning.
              </p>
              <p data-speed="-1" data-start="top bottom" data-end="bottom top">
                The other half is building the products themselves — which is how Slacker AI and
                Aurora exist.
              </p>
              <p data-speed="-1" data-start="top bottom" data-end="bottom top">
                <span style={{ opacity: 0.5, display: "block", paddingTop: "0.5em" }}>
                  Always shipping
                  <span className="animate-dot">.</span>
                  <span className="animate-dot">.</span>
                  <span className="animate-dot">.</span>
                </span>
              </p>
            </div>
            <div className="flex-col">
              <div className="single-about-image">
                {/* No parallax here: the drift needs the image to overhang its
                    frame, and that overhang is exactly the resolution the shot
                    can least afford. The column beside it still parallaxes. */}
                <div className="overlay overlay-image" role="img" aria-label="Syed Mustafa Ali" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-services">
        <div className="container">
          <div className="row">
            <div className="flex-col">
              <h2>
                What I can take on
                <span className="animate-dot">.</span>
                <span className="animate-dot">.</span>
                <span className="animate-dot">.</span>
              </h2>
            </div>
          </div>
          <div className="row">
            {services.map((service) => (
              <div className="flex-col" key={service.index}>
                <h5>{service.index}</h5>
                <div className="stripe" />
                <h4>{service.title}</h4>
                <p>{service.body}</p>
                <div className="service-tags">
                  {service.tags.map((tag) => (
                    <span className="service-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-career">
        <div className="container medium">
          <div className="row">
            <div className="flex-col">
              <h2>Career &amp; education</h2>
            </div>
          </div>
          <ul className="career-list">
            {career.map((entry) => (
              <li key={`${entry.role}-${entry.from}`}>
                <div className="career-role">
                  <h4>{entry.role}</h4>
                  <p>{entry.org}</p>
                </div>
                <div className="career-body">
                  <p>{entry.body}</p>
                </div>
                <div className="career-period">
                  <span>{entry.from}</span>
                  <span>{entry.to}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section about-stack">
        <div className="container medium">
          <div className="row">
            <div className="flex-col">
              <h2>The stack I reach for</h2>
            </div>
          </div>
          <div className="stack-groups">
            {stack.map((group) => (
              <div className="stack-group" key={group.title}>
                <h5>{group.title}</h5>
                <div className="stripe" />
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
