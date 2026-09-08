/** The rotating wireframe orbit inside the accent disc. */
export default function Globe() {
  return (
    <div className="digital-ball" aria-hidden="true">
      <div className="overlay" />
      <div className="globe">
        <div className="globe-wrap">
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="circle-hor" />
          <div className="circle-hor-middle" />
        </div>
      </div>
    </div>
  );
}
