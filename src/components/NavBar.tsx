import { BtnLink, SmartLink } from "./Btn";
import { useRouter } from "../router/Router";
import { useNav } from "./NavContext";

const links = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Fixed-position top bar: signature on the left, links on the right. */
export default function NavBar() {
  const { path } = useRouter();
  const { open, toggle } = useNav();

  return (
    <div className="nav-bar">
      <div className="credits-top">
        <div className="btn btn-link btn-left-top">
          <SmartLink
            href="/"
            label="Home"
            className="btn-click"
            ariaLabel="Syed Mustafa Ali — home"
          >
            <span className="btn-text">
              <span className="credit" aria-hidden="true">
                <span>©</span>
              </span>
              <span className="cbd">
                <span className="code-by">Built by&nbsp;</span>
                <span className="surname-wrap">
                  <span className="firstname">Mustafa</span>
                  <span className="surname">Ali</span>
                </span>
              </span>
            </span>
          </SmartLink>
        </div>
      </div>

      <ul className="links-wrap">
        {links.map((link) => (
          <BtnLink
            key={link.href}
            href={link.href}
            label={link.label}
            active={path === link.href || path.startsWith(`${link.href}/`)}
          >
            {link.label}
          </BtnLink>
        ))}
        <li className="btn btn-link btn-menu">
          <button
            type="button"
            className="btn-click magnetic"
            data-strength="20"
            data-strength-text="10"
            aria-controls="site-navigation"
            aria-expanded={open}
            onClick={toggle}
          >
            <span className="btn-text">
              <span className="btn-text-inner">Menu</span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}
