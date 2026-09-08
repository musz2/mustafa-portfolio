interface ArrowProps {
  big?: boolean;
  className?: string;
}

/** The up-right arrow that recurs across the site, rotated by scroll triggers. */
export default function Arrow({ big, className }: ArrowProps) {
  return (
    <div className={`arrow${big ? " big" : ""}${className ? ` ${className}` : ""}`}>
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
        <g stroke="currentColor" strokeWidth="1.5" fill="none" fillRule="evenodd">
          <g transform="translate(7, 7) rotate(90) translate(-7, -7) translate(1, 1)">
            <polyline points="2.76923077 0 12 0 12 9.23076923" />
            <line x1="12" y1="0" x2="0" y2="12" />
          </g>
        </g>
      </svg>
    </div>
  );
}
