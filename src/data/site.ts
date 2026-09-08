export const site = {
  name: "Syed Mustafa Ali",
  /** The hero wordmark runs short — the full name carries elsewhere. */
  heroName: "Syed Mustafa",
  firstName: "Syed",
  lastName: "Mustafa Ali",
  role: "DevOps & Cloud Engineer",
  roleLead: "DevOps",
  roleRest: "& Cloud Engineer",
  location: "Hyderabad, India",
  city: "Hyderabad",
  timeZone: "Asia/Kolkata",
  email: "alisyedmustafa28@gmail.com",
  phone: "+91 7995370881",
  phoneHref: "tel:+917995370881",
  resume: "/Syed_Mustafa_Ali_Resume.pdf",
  github: "https://github.com/musz2",
  linkedin: "https://www.linkedin.com/in/musz2/",
  edition: "2026 © Edition",
  metaTitle: "Syed Mustafa Ali — DevOps & Cloud Engineer",
  metaDescription:
    "DevOps and cloud engineer in Hyderabad. Infrastructure, CI/CD, containers and release pipelines — plus shipped AI products including Slacker AI and Aurora.",
} as const;

export const socials = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Email", href: `mailto:${site.email}` },
  { label: "Résumé", href: site.resume },
] as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Cycled by the loader on a cold start — greetings, not page names. */
export const greetings = [
  { text: "Hello", script: false },
  { text: "السلام علیکم", script: true },
  { text: "నమస్కారం", script: true },
  { text: "नमस्ते", script: true },
  { text: "Bonjour", script: false },
  { text: "Hola", script: false },
  { text: "こんにちは", script: true },
  { text: "Ciao", script: false },
  { text: "Hello", script: false },
] as const;

export const services = [
  {
    index: "01",
    title: "Cloud & Infrastructure",
    body: "I build and run cloud-ready infrastructure — Linux hosts, networking, container workloads and the monitoring around them — so services stay up and stay observable once they're live.",
    tags: ["Linux", "AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
  },
  {
    index: "02",
    title: "Pipelines & Automation",
    body: "Deployment pipelines, release matrices and the scripting that removes manual steps. From a commit to a signed, checksummed artefact on five platforms without anyone touching a console.",
    tags: ["Jenkins", "GitHub Actions", "Ansible", "Python", "Bash", "Railway"],
  },
  {
    index: "03",
    title: "The full product",
    body: "Where it counts I take the whole thing — desktop client, Node service, database and the release pipeline. Slacker AI and Aurora both shipped that way, end to end.",
    tags: ["React", "TypeScript", "Electron", "Express", "PostgreSQL", "Prisma"],
  },
] as const;

export const career = [
  {
    role: "DevOps Engineer",
    org: "Debug Tech",
    from: "May 2026",
    to: "Present",
    body: "Cloud and infrastructure operations, automating deployment and system workflows, and shipping containerised services with monitoring and reliability practices built in.",
  },
  {
    role: "Associate System Engineer",
    org: "Wipro",
    from: "Sep 2024",
    to: "May 2026",
    body: "Enterprise IT infrastructure and operations across Linux, networking and cloud — system monitoring, troubleshooting and production support for business-critical systems.",
  },
  {
    role: "Shipping AI products",
    org: "Independent",
    from: "2026",
    to: "Now",
    body: "Designing, building and releasing real products — Slacker AI and Aurora — across Electron desktop apps, Node services and multi-platform release pipelines.",
  },
  {
    role: "B.Tech, Information Technology",
    org: "Shadan College of Engineering & Technology",
    from: "2021",
    to: "2024",
    body: "Foundations in computer systems, networking, databases, programming and modern software engineering practice.",
  },
] as const;

export const stack = [
  {
    title: "Infrastructure",
    items: ["Linux", "AWS", "Azure", "Nginx", "Networking", "Bash"],
  },
  {
    title: "Platform",
    items: ["Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins", "GitHub Actions"],
  },
  {
    title: "Observability",
    items: ["Prometheus", "Grafana", "Log pipelines", "Healthchecks", "Alerting"],
  },
  {
    title: "Product",
    items: ["TypeScript", "React", "Electron", "Node & Express", "PostgreSQL", "Prisma"],
  },
] as const;
