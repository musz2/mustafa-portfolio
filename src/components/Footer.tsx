import { useEffect, useState } from "react";
import Arrow from "./Arrow";
import { BtnLink, BtnNormal, BtnRound } from "./Btn";
import { SmartLink } from "./Btn";
import { projects, type Project } from "../data/projects";
import { site, socials } from "../data/site";

function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat([], {
      timeZone: site.timeZone,
      timeZoneName: "short",
      hour: "2-digit",
      hour12: true,
      minute: "numeric",
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="time-value">{time}</span>;
}

interface FooterProps {
  /** Contact page already is the call to action, so it drops the big block. */
  contactPage?: boolean;
  /** Case pages close on the next project instead. */
  nextCase?: Project;
}

export default function Footer({ contactPage = false, nextCase }: FooterProps) {
  const bare = contactPage || Boolean(nextCase);

  return (
    <>
      {!contactPage && (
        <div className="footer-rounded-div" aria-hidden="true">
          <div className="rounded-div-wrap">
            <div className="rounded-div" />
          </div>
        </div>
      )}

      <div
        className={`footer-wrap theme-dark${
          contactPage ? " footer-contact" : nextCase ? " footer-case-wrap" : " footer-footer-wrap"
        }`}
      >
        <footer className="section footer" data-speed="-1.8"
          data-start="top bottom"
          data-end="bottom bottom">
          {nextCase && (
            <div className="container medium">
              <SmartLink
                href={`/work/${nextCase.slug}`}
                label={nextCase.title}
                className="row next-case-btn"
                magnetic={false}
              >
                <span className="flex-col">
                  <p>Next case</p>
                  <h2>{nextCase.title}</h2>
                </span>
                <span className="tile-image-wrap" aria-hidden="true">
                  <span className="tile-image">
                    <span
                      className="overlay"
                      data-speed="0.8"
                      data-start="top bottom"
                      style={{
                        backgroundColor: nextCase.tone,
                        backgroundImage: `url(${nextCase.hero})`,
                      }}
                    />
                  </span>
                </span>
              </SmartLink>

              <div className="row">
                <div className="flex-col">
                  <div className="stripe" />
                </div>
              </div>

              <div className="row">
                <div className="flex-col">
                  <BtnNormal href="/work" label="Work">
                    All work
                    <span className="count-nr">{projects.length}</span>
                  </BtnNormal>
                </div>
              </div>
            </div>
          )}

          {!bare && (
            <div className="container medium">
              <div className="row">
                <div className="flex-col">
                  <Arrow />
                  <h2>
                    <span>
                      <span className="profile-picture" aria-hidden="true" /> Let&rsquo;s build
                    </span>{" "}
                    <span>something solid</span>
                  </h2>
                </div>
              </div>

              <div className="row">
                <div className="flex-col">
                  <div className="stripe" />
                  <div className="btn-fixed">
                    <BtnRound href="/contact" label="Contact">
                      Get in touch
                    </BtnRound>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="flex-col">
                  <BtnNormal href={`mailto:${site.email}`}>{site.email}</BtnNormal>
                  <BtnNormal href={site.phoneHref}>{site.phone}</BtnNormal>
                </div>
              </div>
            </div>
          )}

          <div className="container no-padding">
            <div className="row bottom-footer">
              <div className="flex-col">
                <div className="credits">
                  <h5>Version</h5>
                  <p>{site.edition}</p>
                </div>
                <div className="time">
                  <h5>Local time</h5>
                  <p>
                    <LocalTime />
                  </p>
                </div>
              </div>
              <div className="flex-col">
                <div className="socials">
                  <h5>Socials</h5>
                  <ul>
                    {socials.map((social) => (
                      <BtnLink key={social.label} href={social.href} external>
                        {social.label}
                      </BtnLink>
                    ))}
                  </ul>
                  <div className="stripe" />
                </div>
              </div>
            </div>
          </div>
        </footer>
        {!contactPage && <div className="overlay overlay-gradient" aria-hidden="true" />}
      </div>
    </>
  );
}
