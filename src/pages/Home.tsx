import Arrow from "../components/Arrow";
import Globe from "../components/Globe";
import NavBar from "../components/NavBar";
import RollingName from "../components/RollingName";
import Footer from "../components/Footer";
import { BtnNormal, BtnRound } from "../components/Btn";
import { WorkRows, WorkTiles } from "../components/WorkList";
import { projects } from "../data/projects";
import { site } from "../data/site";

const featured = projects.slice(0, 4);

/**
 * The tiles that drift past below the work list: every project's own hero,
 * then their app icons to fill the second row. Distinct images, each
 * one belonging to the project it shows.
 */
const drift = [
  ...projects.map((project) => ({ src: project.hero, alt: project.heroAlt })),
  ...projects.map((project) => ({ src: project.icon, alt: project.iconAlt })),
].slice(0, 8);

export default function Home() {
  return (
    <>
      <header className="section home-header theme-dark">
        <div className="overlay personal-image no-select once-in">
          <img
            src="/images/mustafa-hero.webp"
            alt="Syed Mustafa Ali"
            width={2460}
            height={2060}
            fetchPriority="high"
            data-speed="-2.5"
            data-trigger=".home-header"
            data-start="top top"
            data-end="bottom top"
          />
        </div>

        <div className="overlay get-height once-in once-in-secondary">
          <div className="hanger">
            <p>
              <span>Located</span>
              <span>in</span>
              <span>{site.city}</span>
            </p>
            <svg
              className="hanger-shape"
              width="300"
              height="121"
              viewBox="0 0 300 121"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M239.63 0C272.77 0 299.63 26.86 299.63 60s-26.86 60-59.999 60H0V0h239.63Zm0 18.78c-22.77 0-41.22 18.45-41.22 41.22s18.45 41.22 41.22 41.22 41.22-18.45 41.22-41.22-18.45-41.22-41.22-41.22Z"
              />
            </svg>
            <Globe />
          </div>
        </div>

        <NavBar />

        <div className="container once-in once-in-secondary">
          <div className="row">
            <div className="flex-col">
              <div className="header-above-h4" data-speed="1">
                <Arrow big />
              </div>
              <h4>
                <span>DevOps &amp; Cloud</span> Engineer
              </h4>
            </div>
          </div>
        </div>

        <RollingName />
      </header>

      <section className="section home-intro">
        <div className="container medium">
          <div className="row">
            <div className="flex-col">
              <h4 className="span-lines animate">
                I build the infrastructure products run on — and then I build the products.
                Pipelines, containers, releases; no guesswork, nothing left manual.
              </h4>
            </div>
            <div className="flex-col">
              <div className="text-wrap fade-in animate">
                <p>
                  DevOps by trade, product engineer by habit. That combination is why my work
                  ships instead of stalling at the last mile.
                </p>
              </div>
              <BtnRound href="/about" label="About">
                About me
              </BtnRound>
            </div>
          </div>
        </div>
      </section>

      <section className="section work-grid large-work-grid">
        <div className="container">
          <div className="grid-sub-title">
            <div className="flex-col">
              <h5>Recent work</h5>
            </div>
            <div className="flex-col">
              <h5>Services</h5>
            </div>
          </div>
          <WorkRows items={featured} variant="large" />
        </div>
      </section>

      <section className="section work-tiles work-tiles-home">
        <div className="container">
          <h2>Recent work</h2>
          <WorkTiles items={featured.slice(0, 2)} />
        </div>
      </section>

      <section className="section center-grid-btn center-grid-btn-home">
        <div className="container">
          <div className="grid-after-btn">
            <BtnNormal href="/work" label="Work">
              More work
            </BtnNormal>
          </div>
        </div>
      </section>

      <section className="section horizontal-items">
        <div className="container">
          <div className="row row-1">
            {drift.slice(0, 4).map((item) => (
              <div className="flex-col" key={item.src}>
                <div className="horizontal-single-item">
                  <div
                    className="overlay"
                    role="img"
                    aria-label={item.alt}
                    style={{ backgroundImage: `url(${item.src})` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="row row-2">
            {drift.slice(4).map((item) => (
              <div className="flex-col" key={item.src}>
                <div className="horizontal-single-item">
                  <div
                    className="overlay"
                    role="img"
                    aria-label={item.alt}
                    style={{ backgroundImage: `url(${item.src})` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
