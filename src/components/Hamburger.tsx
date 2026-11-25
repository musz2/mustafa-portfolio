import { useNav } from "./NavContext";

export default function Hamburger({ scrolled }: { scrolled: boolean }) {
  const { open, toggle } = useNav();

  return (
    <div className={`btn btn-hamburger${open ? " active" : ""}`}>
      <button
        type="button"
        className="btn-click magnetic"
        data-strength="50"
        data-strength-text="25"
        tabIndex={open || scrolled ? 0 : -1}
        aria-hidden={!open && !scrolled}
        aria-controls="site-navigation"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={toggle}
      >
        <span className="btn-fill" />
        <span className="btn-text">
          <span className="btn-bars" aria-hidden="true" />
        </span>
      </button>
    </div>
  );
}
