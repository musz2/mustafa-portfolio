export interface Project {
  id: string;
  title: string;
  tagline: string;
  year: string;
  kind: string;
  featured?: boolean;
  /** Primary preview — a real screenshot of the shipped product. */
  image: string;
  /** Revealed on hover as a second look at the same product. */
  imageAlt?: string;
  imageAltLabel?: string;
  alt: string;
  /** Darker previews need a deeper plate behind them. */
  tone: "dark" | "light";
  /** Wide brand artwork is letterboxed rather than cropped. */
  fit?: "cover" | "contain";
  tech: string[];
  overview: string;
  role?: string;
  engineering?: string[];
  challenges?: string[];
  live?: string;
  liveLabel?: string;
  repo?: string;
  /** Shown in place of a live link when there is nothing deployed to visit. */
  liveNote?: string;
}

export const projects: Project[] = [
  {
    id: "slacker",
    title: "Slacker AI",
    tagline: "Real-time AI meeting & interview copilot",
    year: "2026",
    kind: "Desktop product",
    featured: true,
    image: "/images/projects/slacker-app.webp",
    imageAlt: "/images/projects/slacker-overlay.webp",
    imageAltLabel: "Overlay",
    alt: "Slacker AI desktop app showing a live speaker-separated transcript beside AI-composed answers",
    tone: "dark",
    tech: [
      "React",
      "TypeScript",
      "Electron",
      "Tailwind CSS",
      "Zustand",
      "Express",
      "OpenAI",
      "Deepgram",
      "PostgreSQL",
      "Railway",
    ],
    overview:
      "A desktop copilot that listens to a call, transcribes each speaker as they talk, and composes an answer you can read mid-conversation. A separate always-on-top overlay window keeps the assist visible over any app without showing up in the meeting itself.",
    role: "Built end to end — desktop app, backend service, and the multi-platform release pipeline.",
    engineering: [
      "Electron shell with a Vite/React renderer plus a second always-on-top overlay window that stays out of screen shares.",
      "Live speaker-diarized transcription streamed over WebSockets through Deepgram, with system-audio and room-audio capture.",
      "Answer composition through OpenAI, with a demo mode that composes locally from the transcript when no provider key is configured.",
      "Express API hardened with helmet, rate limiting, and zod request validation, backed by PostgreSQL.",
      "electron-builder release matrix producing a macOS arm64 .dmg and a portable Windows x64 build, with documented install paths for unsigned Gatekeeper and SmartScreen warnings.",
    ],
    challenges: [
      "An assist panel is useless if it shows up in the screen share. Solved with a separate always-on-top overlay window, excluded from capture, driven by the same renderer state as the main app.",
      "Answers have to arrive while the conversation is still on that topic, so transcription streams over WebSockets and answers compose against a rolling window of the last few minutes rather than the whole call.",
      "Shipping unsigned early-access builds means Gatekeeper and SmartScreen actively block the app — handled with a documented install path and quarantine-removal steps rather than leaving testers stuck.",
    ],
    repo: "https://github.com/musz2/slacker-releases",
    liveNote: "Desktop app — see Releases",
  },
  {
    id: "aurora",
    title: "Aurora",
    tagline: "Real-time AI meeting companion",
    year: "2026",
    kind: "Desktop + web product",
    image: "/images/projects/aurora-app.webp",
    imageAlt: "/images/projects/aurora-glass.webp",
    imageAltLabel: "Overlay",
    alt: "Aurora desktop app dashboard showing meeting stats, recent meetings, action items and upcoming calls",
    tone: "light",
    tech: [
      "Electron",
      "React",
      "TypeScript",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Deepgram",
      "OpenAI",
      "AWS S3",
      "Docker",
      "Railway",
    ],
    overview:
      "Aurora transcribes as people speak, answers privately mid-call, and hands over clean notes the moment the call ends. It ships as both a desktop app and a web app, with sessions that stay private unless you share the link.",
    role: "Built end to end — the monorepo, the desktop client, the web app, the backend service, and the release and deploy pipeline.",
    engineering: [
      "pnpm monorepo splitting desktop, web, and server apps over a shared types package.",
      "Server deployed to Railway from a Dockerfile, with Prisma migrations as a pre-deploy step, a /health healthcheck, and an on-failure restart policy.",
      "Translucent always-on-top transcript overlay with adjustable opacity for video, light, dark, and slide backgrounds.",
      "Five-target installer matrix — macOS arm64 and x64, Windows x64, Linux AppImage and .deb — each release publishing SHA256SUMS for verification.",
      "electron-updater for desktop updates, with S3-backed storage and Redis-backed session state behind the API.",
    ],
    challenges: [
      "Capturing other participants' audio is not available on every platform, so Windows and Linux ship in microphone-only mode with the limitation stated in the UI instead of failing quietly.",
      "A transcript overlay has to stay readable over video, slides, and light or dark backgrounds — solved with an adjustable-opacity glass panel tuned against each of those cases.",
      "Five installer targets across three operating systems is a supply-chain surface, so every release publishes SHA256 checksums and the app updates through electron-updater.",
    ],
    live: "https://aurora-web-phi.vercel.app",
    repo: "https://github.com/musz2/aurora-downloads",
  },
  {
    id: "jsam",
    title: "JSAM Collections",
    tagline: "Premium modest fashion storefront",
    year: "2026",
    kind: "E-commerce site",
    image: "/images/projects/jsam.webp",
    alt: "JSAM Collections storefront homepage with a full-bleed modest fashion hero",
    tone: "dark",
    tech: ["HTML", "CSS", "JavaScript", "WhatsApp ordering", "Static deploy"],
    overview:
      "A multi-page storefront for a Houston-based modest fashion label, covering new arrivals, clothing, hijabs, mens, and a journal, plus the size guide, shipping, returns, and privacy pages a real shop needs. Orders route to WhatsApp instead of a checkout.",
    engineering: [
      "Hand-built static front end — no storefront platform behind it — with a full-bleed editorial hero and scroll-reveal product sections.",
      "Product pages drive enquiries straight to WhatsApp, which suits a made-to-order catalogue better than a cart.",
      "Region and currency indicator, wishlist and cart affordances, and a complete set of policy pages.",
    ],
    repo: "https://github.com/musz2/JSAM-COLLECTION",
    liveNote: "Deployment offline",
  },
  {
    id: "tci",
    title: "The Career Insights",
    tagline: "Talent & workforce solutions site",
    year: "2026",
    kind: "Marketing site",
    image: "/images/projects/tci.webp",
    alt: "The Career Insights homepage with a bold split hero and enquiry call to action",
    tone: "light",
    tech: ["HTML", "CSS", "JavaScript", "Responsive layout", "Static deploy"],
    overview:
      "Marketing site for a talent and workforce solutions company, built around a bold split hero, a solutions and industries structure, and a clear enquiry path for prospective clients.",
    engineering: [
      "Typographic hero with a two-tone headline treatment and a paired imagery panel.",
      "Sectioned information architecture across solutions, industries, expertise, leadership, and about.",
      "Persistent enquiry call to action and a chat affordance carried across the page.",
    ],
    live: "https://thecareerinsights.vercel.app",
    repo: "https://github.com/musz2/thecareerinsights",
  },
  {
    id: "dts",
    title: "Debug Tech Studio",
    tagline: "Studio site for a Hyderabad technology company",
    year: "2026",
    kind: "Studio site",
    image: "/images/projects/dts.webp",
    alt: "Debug Techstudio brand artwork",
    tone: "dark",
    fit: "contain",
    tech: ["Nuxt", "Vue", "WebGL", "Theatre.js", "Sanity CMS", "Tailwind CSS"],
    overview:
      "Site for Debug Techstudio, the Hyderabad technology studio behind web and application development, testing, IT services, staffing, and e-learning work. A WebGL intro sequence carries the brand before the content loads.",
    engineering: [
      "Nuxt application with server-rendered payloads and route-level prerendering.",
      "WebGL intro and scroll sequences driven through Theatre.js animation state.",
      "Sanity-backed content with an image pipeline serving responsive derivatives.",
    ],
    live: "https://debugtechstudio.vercel.app",
    repo: "https://github.com/musz2/DTS",
  },
];
