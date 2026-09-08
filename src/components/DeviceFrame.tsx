/**
 * A 16" laptop frame drawn as vector, on the same 2400 × 1370 field the classic
 * lower-angle mock-ups use, so it drops straight into that layout maths.
 *
 * Measured geometry:
 *   lid      rounded top corners, then near-vertical sides leaning out 7px
 *   bezel    28px, constant — inner path runs parallel to the outer
 *   screen   y 28 → 1213  (centre 45.3% down, 62.5% of its width tall)
 *   notch    x 1100 → 1300, hanging from the top edge to y 63
 *   chin     y 1213 → 1277, lid width
 *   deck     y 1277 → 1357, full width, rounded front corners + two feet
 *
 * The screen is a real hole (even-odd fill), so the screenshot behind shows
 * through and the bezel, notch and deck sit over it.
 */
export default function DeviceFrame() {
  return (
    <svg
      className="device-svg"
      viewBox="0 0 2400 1370"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Brushed aluminium: bright top lip, body, dark front edge */}
        <linearGradient id="dfDeck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a6a7ac" />
          <stop offset="7%" stopColor="#80828a" />
          <stop offset="16%" stopColor="#888a92" />
          <stop offset="30%" stopColor="#8e9098" />
          <stop offset="50%" stopColor="#91939a" />
          <stop offset="62%" stopColor="#8c8d95" />
          <stop offset="70%" stopColor="#797a82" />
          <stop offset="78%" stopColor="#595b62" />
          <stop offset="84%" stopColor="#505258" />
          <stop offset="93%" stopColor="#62646b" />
          <stop offset="100%" stopColor="#6a6c73" />
        </linearGradient>

        {/* Ends of the deck fall away from the light */}
        <linearGradient id="dfDeckEnds" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0.26" />
          <stop offset="5%" stopColor="#000" stopOpacity="0.06" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="95%" stopColor="#000" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.26" />
        </linearGradient>

        <linearGradient id="dfThumb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9cad0" />
          <stop offset="18%" stopColor="#eaeaec" />
          <stop offset="100%" stopColor="#e2e2e6" />
        </linearGradient>

        {/* Machined edge running round the lid */}
        <linearGradient id="dfRim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9a9ca2" />
          <stop offset="8%" stopColor="#4d4f55" />
          <stop offset="50%" stopColor="#3f4147" />
          <stop offset="92%" stopColor="#4d4f55" />
          <stop offset="100%" stopColor="#9a9ca2" />
        </linearGradient>

        <linearGradient id="dfChin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" />
          <stop offset="35%" stopColor="#1a1a1c" />
          <stop offset="100%" stopColor="#232325" />
        </linearGradient>
      </defs>

      {/* ---- Feet ------------------------------------------------------- */}
      <path d="M133 1330 H271 V1358 a6 6 0 0 1 -6 6 H139 a6 6 0 0 1 -6 -6 Z" fill="#3d3f45" />
      <path d="M2128 1330 H2266 V1358 a6 6 0 0 1 -6 6 H2134 a6 6 0 0 1 -6 -6 Z" fill="#3d3f45" />

      {/* ---- Deck ------------------------------------------------------- */}
      <path
        d="M0 1277 H2400 V1323 a34 34 0 0 1 -34 34 H34 A34 34 0 0 1 0 1323 Z"
        fill="url(#dfDeck)"
      />
      <path
        d="M0 1277 H2400 V1323 a34 34 0 0 1 -34 34 H34 A34 34 0 0 1 0 1323 Z"
        fill="url(#dfDeckEnds)"
      />

      {/* Thumb cut-out */}
      <path
        d="M1021 1277 H1379 V1291 a13 13 0 0 1 -13 13 H1034 a13 13 0 0 1 -13 -13 Z"
        fill="url(#dfThumb)"
      />
      <path d="M1021 1277 H1379 V1283 H1021 Z" fill="#000" opacity="0.2" />

      {/* ---- Lid chin --------------------------------------------------- */}
      <path d="M227 1213 H2172 V1277 H227 Z" fill="url(#dfChin)" />

      {/* ---- Lid shell, screen punched out ------------------------------ */}
      <path
        fillRule="evenodd"
        fill="#08080a"
        d="M272 8 H2128 A38 38 0 0 1 2166 46 L2172 1216 H227 L234 46 A38 38 0 0 1 272 8 Z
           M282 28 H2118 A20 20 0 0 1 2138 48 L2144 1213 H255 L262 48 A20 20 0 0 1 282 28 Z"
      />

      {/* Machined edge */}
      <path
        d="M272 8 H2128 A38 38 0 0 1 2166 46 L2172 1216 H227 L234 46 A38 38 0 0 1 272 8 Z"
        fill="none"
        stroke="url(#dfRim)"
        strokeWidth="3"
      />

      {/* ---- Notch ------------------------------------------------------ */}
      <path
        d="M1100 8 H1300 V50 a13 13 0 0 1 -13 13 H1113 a13 13 0 0 1 -13 -13 Z"
        fill="#08080a"
      />
      <circle cx="1200" cy="35" r="7" fill="#23232a" />
      <circle cx="1198" cy="33" r="2.2" fill="#474753" />
    </svg>
  );
}
