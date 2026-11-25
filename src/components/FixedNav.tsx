import { BtnLink } from "./Btn";
import { useNav } from "./NavContext";
import { useRouter } from "../router/Router";
import { navLinks, socials } from "../data/site";

/** The slide-in panel behind the hamburger. */
export default function FixedNav() {
  const { open, close } = useNav();
  const { path } = useRouter();

  return (
    <>
      <button
        type="button"
        className="overlay fixed-nav-back"
        aria-label="Close menu"
        tabIndex={-1}
        aria-hidden="true"
        onClick={close}
      />
      <nav
        className="fixed-nav theme-dark"
        id="site-navigation"
        data-lenis-prevent
        aria-label="Main"
        aria-hidden={!open}
        {...(open ? {} : { inert: "" })}
      >
        <div className="fixed-nav-rounded-div" aria-hidden="true">
          <div className="rounded-div-wrap">
            <div className="rounded-div" />
          </div>
        </div>
        <div className="fixed-nav-inner">
          <div className="row nav-row">
            <h5>Navigation</h5>
            <div className="stripe" />
            <ul className="links-wrap">
              {navLinks.map((link) => (
                <BtnLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  onNavigate={close}
                  active={
                    link.href === "/"
                      ? path === "/"
                      : path === link.href || path.startsWith(`${link.href}/`)
                  }
                >
                  {link.label}
                </BtnLink>
              ))}
            </ul>
          </div>

          <div className="row social-row">
            <div className="stripe" />
            <div className="socials">
              <h5>Socials</h5>
              <ul>
                {socials.map((social) => (
                  <BtnLink key={social.label} href={social.href} external>
                    {social.label}
                  </BtnLink>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
