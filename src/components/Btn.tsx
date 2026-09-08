import type { MouseEvent, ReactNode } from "react";
import { useRouter } from "../router/Router";

const isInternal = (href: string) =>
  href.startsWith("/") && !href.startsWith("//") && !/\.[a-z0-9]{2,4}$/i.test(href);

interface SmartLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  label?: string;
  onNavigate?: () => void;
  ariaLabel?: string;
  strength?: number;
  strengthText?: number;
  magnetic?: boolean;
}

/**
 * Internal hrefs run through the curtain transition; anything else is a plain
 * anchor that opens in a new tab. Real `href`s either way, so the links are
 * still copyable, middle-clickable and crawlable.
 */
export function SmartLink({
  href,
  className,
  children,
  label,
  onNavigate,
  ariaLabel,
  strength = 20,
  strengthText = 10,
  magnetic = true,
}: SmartLinkProps) {
  const { navigate } = useRouter();
  const internal = isInternal(href);

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!internal) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    onNavigate?.();
    navigate(href, label);
  };

  return (
    <a
      href={href}
      className={[className, magnetic ? "magnetic" : ""].filter(Boolean).join(" ")}
      data-strength={magnetic ? strength : undefined}
      data-strength-text={magnetic ? strengthText : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      {...(internal ? {} : { target: "_blank", rel: "noreferrer" })}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */

interface BtnProps {
  href: string;
  children: ReactNode;
  label?: string;
  onNavigate?: () => void;
  className?: string;
  active?: boolean;
}

/** Pill button with the disc of colour that wipes up on hover. */
export function BtnNormal({ href, children, label, className, active }: BtnProps) {
  return (
    <div className={`btn btn-normal${active ? " active" : ""}${className ? ` ${className}` : ""}`}>
      <SmartLink href={href} label={label} className="btn-click" strength={25} strengthText={15}>
        <span className="btn-fill" />
        <span className="btn-text">
          <span className="btn-text-inner change">{children}</span>
        </span>
      </SmartLink>
    </div>
  );
}

interface BtnToggleProps {
  children: ReactNode;
  active?: boolean;
  onClick: () => void;
  className?: string;
  /** For icon-only toggles that carry no readable text. */
  label?: string;
}

/** Same pill, driving local state instead of a route. */
export function BtnToggle({
  children,
  active,
  onClick,
  className,
  label,
}: BtnToggleProps) {
  return (
    <div className={`btn btn-normal${active ? " active" : ""}${className ? ` ${className}` : ""}`}>
      <button
        type="button"
        className="btn-click magnetic"
        data-strength="25"
        data-strength-text="15"
        aria-pressed={active}
        aria-label={label}
        onClick={onClick}
      >
        <span className="btn-fill" />
        <span className="btn-text">
          <span className="btn-text-inner change">{children}</span>
        </span>
      </button>
    </div>
  );
}

/** Big circle — "About me", "Get in touch", "Live site". */
export function BtnRound({ href, children, label, className }: BtnProps) {
  return (
    <div className={`btn btn-round${className ? ` ${className}` : ""}`}>
      <SmartLink href={href} label={label} className="btn-click" strength={100} strengthText={50}>
        <span className="btn-fill" />
        <span className="btn-text">
          <span className="btn-text-inner">{children}</span>
        </span>
      </SmartLink>
    </div>
  );
}

/** Text link with the dot that scales in beneath it. */
export function BtnLink({
  href,
  children,
  label,
  active,
  external,
  onNavigate,
  className,
}: BtnProps & { external?: boolean }) {
  return (
    <li
      className={`btn btn-link${external ? " btn-link-external" : ""}${
        active ? " active" : ""
      }${className ? ` ${className}` : ""}`}
    >
      <SmartLink href={href} label={label} onNavigate={onNavigate} className="btn-click">
        <span className="btn-text">
          <span className="btn-text-inner">{children}</span>
        </span>
      </SmartLink>
    </li>
  );
}
