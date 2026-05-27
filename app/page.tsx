export default function MustafaPortfolio() {
  const skills = {
    Cybersecurity: ["Splunk", "Microsoft Sentinel", "CrowdStrike Falcon", "Threat Hunting", "MITRE ATT&CK"],
    DevOps: ["Docker", "Kubernetes", "Jenkins", "Terraform", "AWS", "Linux"],
    Programming: ["Python", "Bash", "YAML", "JavaScript"],
    Cloud: ["AWS", "Azure"]
  };

  const projects = [
    {
      title: "CI/CD Pipeline",
      desc: "GitHub → Jenkins → Docker → Kubernetes automation pipeline.",
      stack: ["Jenkins", "Docker", "Kubernetes", "GitHub Actions"]
    },
    {
      title: "AWS EC2 Deployment",
      desc: "Production-ready deployment architecture on AWS EC2.",
      stack: ["AWS", "Linux", "Nginx"]
    },
    {
      title: "SIEM Detection Lab",
      desc: "Threat detection dashboards and security analytics.",
      stack: ["Splunk", "Sentinel", "Threat Hunting"]
    },
    {
      title: "Terraform Infrastructure",
      desc: "Infrastructure-as-Code automation using Terraform.",
      stack: ["Terraform", "AWS", "Automation"]
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#00f0ff22,transparent_40%),radial-gradient(circle_at_bottom_left,#7c3aed22,transparent_40%)]" />

      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-widest text-cyan-400">
            MUSTAFA.AI
          </h1>

          <div className="hidden md:flex gap-8 text-sm text-zinc-300">
            <a href="#about" className="hover:text-cyan-400 transition">About</a>
            <a href="#skills" className="hover:text-cyan-400 transition">Skills</a>
            <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
            <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center pt-24">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              SOC Analyst • DevOps Engineer • Cloud Security
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
              Futuristic
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                DevSecOps
              </span>
              Portfolio
            </h1>

            <p className="mt-8 text-zinc-400 text-lg leading-relaxed max-w-2xl">
              I’m Syed Mustafa Ali, a SOC Analyst at Wipro transitioning into DevOps & Cloud Engineering. Building secure, scalable, cloud-native systems with automation, infrastructure-as-code, Kubernetes, and cybersecurity expertise.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href="https://github.com/musz2"
                target="_blank"
                className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition text-black font-semibold shadow-lg shadow-cyan-500/30"
              >
                GitHub
              </a>

              <a
                href="https://linkedin.com/in/mustafa28"
                target="_blank"
                className="px-6 py-3 rounded-2xl border border-white/10 hover:border-cyan-400 transition"
              >
                LinkedIn
              </a>

              <a
                href="#contact"
                className="px-6 py-3 rounded-2xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />

            <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl shadow-cyan-500/10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              <div className="font-mono text-sm space-y-3 text-zinc-300">
                <p>&gt; Initializing DevSecOps Systems...</p>
                <p className="text-cyan-400">✔ Kubernetes Cluster Active</p>
                <p className="text-cyan-400">✔ Threat Detection Online</p>
                <p className="text-cyan-400">✔ CI/CD Pipelines Running</p>
                <p className="text-cyan-400">✔ Cloud Infrastructure Secure</p>
                <p className="text-purple-400">Deploying futuristic engineering experience...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-4">About Me</p>
            <h2 className="text-4xl md:text-6xl font-black">Cybersecurity + DevOps</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <p className="text-zinc-300 text-lg leading-relaxed">
                Experienced SOC Analyst with expertise in Splunk, Microsoft Sentinel, CrowdStrike Falcon, threat hunting, incident response, and MITRE ATT&CK.
                Currently expanding into cloud infrastructure, Kubernetes, Docker, Terraform, automation, and CI/CD engineering.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-3xl bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/20 p-6">
                <h3 className="text-4xl font-black text-cyan-400">2+</h3>
                <p className="text-zinc-400 mt-2">Years Experience</p>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/20 p-6">
                <h3 className="text-4xl font-black text-purple-400">10+</h3>
                <p className="text-zinc-400 mt-2">Projects</p>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/20 p-6">
                <h3 className="text-4xl font-black text-blue-400">24/7</h3>
                <p className="text-zinc-400 mt-2">Security Mindset</p>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-pink-500/20 to-transparent border border-pink-500/20 p-6">
                <h3 className="text-4xl font-black text-pink-400">∞</h3>
                <p className="text-zinc-400 mt-2">Learning Mode</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-4">Skills</p>
            <h2 className="text-4xl md:text-6xl font-black">Technology Stack</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-cyan-400/50 transition duration-500 hover:-translate-y-2"
              >
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">{category}</h3>

                <div className="space-y-3">
                  {items.map((skill) => (
                    <div
                      key={skill}
                      className="px-4 py-3 rounded-xl bg-black/40 border border-white/5 text-zinc-300 hover:bg-cyan-500/10 hover:text-cyan-300 transition"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-4">Projects</p>
            <h2 className="text-4xl md:text-6xl font-black">Featured Engineering Work</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold">{project.title}</h3>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                    ↗
                  </div>
                </div>

                <p className="text-zinc-400 leading-relaxed mb-8">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full bg-black/40 border border-white/10 text-sm text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[40px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-black to-purple-500/10 p-10 backdrop-blur-xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#00ffff22_1px,transparent_1px),linear-gradient(to_bottom,#00ffff22_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative z-10 text-center">
              <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-4">Experience</p>
              <h2 className="text-4xl md:text-6xl font-black mb-10">
                Professional Journey
              </h2>

              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="rounded-3xl bg-black/40 border border-white/10 p-8">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2">Wipro</h3>
                  <p className="text-zinc-300 mb-4">SOC Analyst</p>
                  <p className="text-zinc-500">
                    SIEM monitoring, threat hunting, incident response, Splunk dashboards, Microsoft Sentinel operations.
                  </p>
                </div>

                <div className="rounded-3xl bg-black/40 border border-white/10 p-8">
                  <h3 className="text-2xl font-bold text-purple-400 mb-2">The Career Insights</h3>
                  <p className="text-zinc-300 mb-4">System Engineer</p>
                  <p className="text-zinc-500">
                    DevOps learning, automation workflows, infrastructure deployment, modern engineering systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-4">Terminal</p>
            <h2 className="text-4xl md:text-6xl font-black">Interactive Console</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/80 p-8 font-mono text-green-400 text-sm leading-8 overflow-hidden">
            <p>$ whoami</p>
            <p className="text-cyan-400">Syed Mustafa Ali</p>
            <br />
            <p>$ skills</p>
            <p>Cybersecurity • DevOps • Cloud • Automation • Kubernetes</p>
            <br />
            <p>$ projects</p>
            <p>CI/CD • Terraform • SIEM • AWS • Docker</p>
            <br />
            <p>$ status</p>
            <p className="text-purple-400">Building futuristic infrastructure...</p>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-4">Contact</p>

          <h2 className="text-4xl md:text-7xl font-black leading-tight">
            Let’s Build The
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Future Together
            </span>
          </h2>

          <p className="mt-8 text-zinc-400 text-lg max-w-2xl mx-auto">
            Open to DevOps, Cloud Engineering, SOC, Security Operations, and futuristic infrastructure opportunities.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            <a
              href="mailto:syedalicr4@gmail.com"
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-cyan-400/40 transition"
            >
              <p className="text-zinc-500 mb-2">Email</p>
              <h3 className="text-xl font-bold">syedalicr4@gmail.com</h3>
            </a>

            <a
              href="tel:+917995370881"
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-purple-400/40 transition"
            >
              <p className="text-zinc-500 mb-2">Phone</p>
              <h3 className="text-xl font-bold">+91 7995370881</h3>
            </a>
          </div>

          <div className="flex justify-center gap-6 mt-12">
            <a
              href="https://github.com/musz2"
              target="_blank"
              className="px-6 py-3 rounded-2xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/mustafa28"
              target="_blank"
              className="px-6 py-3 rounded-2xl border border-white/10 hover:border-cyan-400 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 px-6 text-center text-zinc-500 text-sm">
        © 2026 Syed Mustafa Ali • Futuristic DevSecOps Portfolio
      </footer>
    </main>
  );
}

