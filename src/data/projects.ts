export interface Project {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  kind: string;
  /** Drives the work-page filter buttons. */
  categories: ("product" | "infrastructure" | "web")[];
  services: string;
  /** Who else worked on it, or what it was built with — the middle column. */
  credits: string;
  location: string;
  /** Flat colour behind a preview while it loads. */
  tone: string;
  /** Ground the pagebuilder blocks sit on, per the reference's per-block tint. */
  blockTone: string;
  /** Square crop of this project's own hero — work tiles. */
  tile: string;
  /** Landscape crop of the same hero — the case page's opening image. */
  hero: string;
  heroAlt: string;
  /** The project's own app icon, taken straight from its source repo. */
  icon: string;
  iconAlt: string;
  /**
   * Pagebuilder blocks — further shots of this project only, never borrowed.
   * "device" seats the shot in a laptop frame; "fullwidth" runs it edge to edge.
   */
  /**
   * One block per page of the real site, each holding its own scroll
   * recording. `laptop` seats it in the device frame; `browser`
   * runs it in a browser window showing the real domain — the same alternation the reference case pages use.
   */
  gallery?: {
    /** Poster still, shown until the recording starts. */
    src: string;
    alt: string;
    video: string;
    frame?: "laptop" | "browser";
    /** Ground this block sits on. */
    tone?: string;
  }[];
  live?: string;
  liveLabel?: string;
  repo?: string;
  /** What the repo button says when there is no live deployment to visit. */
  repoLabel?: string;
}

export const projects: Project[] = [
  {
    slug: "slacker-ai",
    credits: "Design & build: Syed Mustafa Ali",
    title: "Slacker AI",
    tagline: "Real-time AI meeting & interview copilot",
    year: "2026",
    kind: "Desktop product",
    categories: ["product"],
    services: "Product & Development",
    location: "macOS & Windows",
    tone: "#1C1D20",
    blockTone: "#101114",
    tile: "/images/projects/slacker-hero-tile.webp",
    hero: "/images/projects/slacker-hero.webp",
    heroAlt:
      "Slacker AI's landing page — “Undetectable AI for your meetings” above the app running over a live call",
    icon: "/images/projects/slacker-icon.webp",
    iconAlt: "Slacker AI app icon",
    gallery: [
      {
        video: "/video/slacker-home.mp4",
        src: "/video/slacker-home-poster.webp",
        frame: "laptop",
        tone: "#101114",
        alt: "The Slacker AI home page — the pitch, the app over a live call, and the tools it works with",
      },
      {
        video: "/video/slacker-pricing.mp4",
        src: "/video/slacker-pricing-poster.webp",
        frame: "browser",
        tone: "#17181c",
        alt: "Slacker AI pricing — the free, pro and undetectability plans side by side",
      },
      {
        video: "/video/slacker-compare.mp4",
        src: "/video/slacker-compare-poster.webp",
        frame: "laptop",
        tone: "#101114",
        alt: "Slacker AI's feature-by-feature comparison against the other assistants",
      },
      {
        video: "/video/slacker-manifesto.mp4",
        src: "/video/slacker-manifesto-poster.webp",
        frame: "browser",
        tone: "#17181c",
        alt: "The Slacker AI manifesto — the argument for an assistant nobody else can see",
      },
    ],
    live: "https://slacker-prod.vercel.app",
    liveLabel: "Live site",
    repo: "https://github.com/musz2/slacker-releases",
  },
  {
    slug: "aurora",
    credits: "Design & build: Syed Mustafa Ali",
    title: "Aurora",
    tagline: "Real-time AI meeting companion",
    year: "2026",
    kind: "Desktop + web product",
    categories: ["product", "infrastructure"],
    services: "Product & Infrastructure",
    location: "Desktop & web",
    tone: "#E9EAEB",
    blockTone: "#e7eaf0",
    tile: "/images/projects/aurora-hero-tile.webp",
    hero: "/images/projects/aurora-hero.webp",
    heroAlt:
      "Aurora's translucent always-on-top transcript overlay, speaker-attributed over a live call",
    icon: "/images/projects/aurora-icon.webp",
    iconAlt: "Aurora app icon",
    gallery: [
      {
        video: "/video/aurora-home.mp4",
        src: "/video/aurora-home-poster.webp",
        frame: "laptop",
        tone: "#e7eaf0",
        alt: "The Aurora home page — “Undetectable. Always listening.” over the desktop app",
      },
      {
        video: "/video/aurora-product.mp4",
        src: "/video/aurora-product-poster.webp",
        frame: "browser",
        tone: "#dfe3ea",
        alt: "Aurora's product page — transcription, notes and the always-on-top overlay",
      },
      {
        video: "/video/aurora-pricing.mp4",
        src: "/video/aurora-pricing-poster.webp",
        frame: "laptop",
        tone: "#e7eaf0",
        alt: "Aurora pricing — the plans and what each one includes",
      },
      {
        video: "/video/aurora-security.mp4",
        src: "/video/aurora-security-poster.webp",
        frame: "browser",
        tone: "#dfe3ea",
        alt: "Aurora's security page — how sessions and recordings are handled",
      },
    ],
    live: "https://www.theauroraai.com",
    liveLabel: "Live site",
    repo: "https://github.com/musz2/aurora-downloads",
  },
  {
    slug: "aha-life-support",
    credits: "Build: Syed Mustafa Ali",
    title: "AHA Life Support Academy",
    tagline: "Same-day BLS and ACLS certification",
    year: "2026",
    kind: "Booking & marketing site",
    categories: ["web"],
    services: "Design & Development",
    location: "Houston, USA",
    tone: "#F4F4F5",
    blockTone: "#eceef1",
    tile: "/images/projects/aha-hero-tile.webp",
    hero: "/images/projects/aha-hero.webp",
    heroAlt:
      "AHA Life Support Academy homepage — “Same-day certification. BLS and ACLS for the people who keep others alive.”",
    icon: "/images/projects/aha-icon.webp",
    iconAlt: "AHA Life Support Academy app icon",
    gallery: [
      {
        video: "/video/aha-home.mp4",
        src: "/video/aha-home-poster.webp",
        frame: "laptop",
        tone: "#eceef1",
        alt: "The AHA Life Support Academy home page — same-day BLS and ACLS certification",
      },
      {
        video: "/video/aha-courses.mp4",
        src: "/video/aha-courses-poster.webp",
        frame: "browser",
        tone: "#e4e7ec",
        alt: "The AHA course listing — BLS, ACLS and PALS with session details and pricing",
      },
      {
        video: "/video/aha-how.mp4",
        src: "/video/aha-how-poster.webp",
        frame: "laptop",
        tone: "#eceef1",
        alt: "How it works — HeartCode online coursework, then the in-person skills session",
      },
    ],
    live: "https://aha-life-support-academy.vercel.app",
    liveLabel: "Live site",
    repo: "https://github.com/musz2/AHA-Life-Support",
  },
  {
    slug: "debug-tech-studio",
    credits: "Build: Syed Mustafa Ali",
    title: "Debug Tech Studio",
    tagline: "Studio site for a Hyderabad technology company",
    year: "2026",
    kind: "Studio site",
    categories: ["web"],
    services: "Development & Interaction",
    location: "Hyderabad, India",
    tone: "#141517",
    blockTone: "#070b14",
    tile: "/images/projects/dts-hero-tile.webp",
    hero: "/images/projects/dts-hero.webp",
    heroAlt:
      "Debug Techstudio's WebGL opening scene — a lit cube over a reflective landscape, above the line “We build the future of software”",
    icon: "/images/projects/dts-icon.webp",
    iconAlt: "Debug Techstudio app icon",
    live: "https://debugtechstudio.com",
    liveLabel: "Live site",
    repo: "https://github.com/musz2/DTS",
    gallery: [
      {
        video: "/video/dts-1.mp4",
        src: "/video/dts-1-poster.webp",
        frame: "laptop",
        tone: "#070b14",
        alt: "The Debug Techstudio home page — the lit cube scene into the network and capability sections",
      },
      {
        video: "/video/dts-2.mp4",
        src: "/video/dts-2-poster.webp",
        frame: "browser",
        tone: "#0b111c",
        alt: "The Debug Techstudio about page — “Shape the future” through to “Work with us”",
      },
      {
        video: "/video/dts-3.mp4",
        src: "/video/dts-3-poster.webp",
        frame: "laptop",
        tone: "#070b14",
        alt: "The Debug Techstudio careers page — the impact statement into “About Debug Techstudio”",
      },
    ],
  },
  {
    slug: "the-career-insights",
    credits: "Design & build: Syed Mustafa Ali",
    title: "The Career Insights",
    tagline: "Talent & workforce solutions site",
    year: "2026",
    kind: "Marketing site",
    categories: ["web"],
    services: "Design & Development",
    location: "India",
    tone: "#E9EAEB",
    blockTone: "#efeef0",
    tile: "/images/projects/tci-hero-tile.webp",
    hero: "/images/projects/tci-hero.webp",
    heroAlt:
      "The Career Insights homepage — the two-tone “Your Growth. Our Expertise.” hero beside its imagery panel",
    icon: "/images/projects/tci-icon.webp",
    iconAlt: "The Career Insights app icon",
    gallery: [
      {
        video: "/video/tci-1.mp4",
        src: "/video/tci-1-poster.webp",
        frame: "laptop",
        tone: "#efeef0",
        alt: "The Career Insights home page — the two-tone hero and headline stats",
      },
      {
        video: "/video/tci-2.mp4",
        src: "/video/tci-2-poster.webp",
        frame: "browser",
        tone: "#e7e6e9",
        alt: "The solutions and industries sections — workforce, public sector and technology",
      },
      {
        video: "/video/tci-3.mp4",
        src: "/video/tci-3-poster.webp",
        frame: "laptop",
        tone: "#efeef0",
        alt: "Expertise, leadership and the enquiry call to action",
      },
    ],
    live: "https://thecareerinsights.com",
    liveLabel: "Live site",
    repo: "https://github.com/musz2/thecareerinsights",
  },
  {
    slug: "jsam-collections",
    credits: "Design & build: Syed Mustafa Ali",
    title: "JSAM Collections",
    tagline: "Premium modest fashion storefront",
    year: "2026",
    kind: "E-commerce site",
    categories: ["web"],
    services: "Design & Development",
    location: "Houston, USA",
    tone: "#1C1D20",
    blockTone: "#d9d4d1",
    tile: "/images/projects/jsam-hero-tile.webp",
    hero: "/images/projects/jsam-hero.webp",
    heroAlt:
      "JSAM Collections storefront — the full-bleed “with a modern touch” editorial hero",
    icon: "/images/projects/jsam-icon.webp",
    iconAlt: "JSAM Collections app icon",
    live: "https://jsamcollection.vercel.app",
    liveLabel: "Live site",
    repo: "https://github.com/musz2/JSAM-COLLECTION",
    gallery: [
      {
        video: "/video/jsam-home.mp4",
        src: "/video/jsam-home-poster.webp",
        frame: "laptop",
        tone: "#d9d4d1",
        alt: "The JSAM Collections storefront — the editorial hero into the category grid",
      },
      {
        video: "/video/jsam-clothing.mp4",
        src: "/video/jsam-clothing-poster.webp",
        frame: "browser",
        tone: "#d1ccc8",
        alt: "The clothing catalogue — the made-to-order range",
      },
      {
        video: "/video/jsam-journal.mp4",
        src: "/video/jsam-journal-poster.webp",
        frame: "laptop",
        tone: "#d9d4d1",
        alt: "The JSAM journal — the label's editorial pages",
      },
    ],
  },
];

export const projectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const nextProject = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return projects[0];
  return projects[(index + 1) % projects.length];
};

export const filters = [
  { id: "all", label: "All" },
  { id: "product", label: "Product" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "web", label: "Web" },
] as const;

export type FilterId = (typeof filters)[number]["id"];
