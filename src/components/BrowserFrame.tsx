/**
 * A minimal browser window for the frameless blocks. The reference runs those
 * takes bare; putting real chrome and the real domain around them says which
 * site you are looking at without adding a caption.
 */
export default function BrowserFrame({
  domain,
  children,
}: {
  domain: string;
  children: React.ReactNode;
}) {
  return (
    <div className="browser">
      <div className="browser-bar" aria-hidden="true">
        <span className="browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-url">{domain}</span>
      </div>
      <div className="browser-screen">{children}</div>
    </div>
  );
}
