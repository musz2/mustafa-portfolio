```tsx
"use client"

import { motion } from "framer-motion"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import { Typewriter } from "react-simple-typewriter"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere } from "@react-three/drei"
import GitHubCalendar from "react-github-calendar"
import { useEffect, useState } from "react"
import { FaGithub, FaTerminal, FaRobot } from "react-icons/fa"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [command, setCommand] = useState("")
  const [output, setOutput] = useState("Type help")

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleCommand = (e: any) => {
    if (e.key === "Enter") {
      if (command === "help") {
        setOutput("Commands: help, skills, projects, contact")
      } else if (command === "skills") {
        setOutput("Docker Kubernetes AWS Terraform Splunk")
      } else if (command === "projects") {
        setOutput("CI/CD Pipeline, SIEM Lab, Terraform Infra")
      } else if (command === "contact") {
        setOutput("syedalicr4@gmail.com")
      } else {
        setOutput("Unknown command")
      }

      setCommand("")
    }
  }

  if (loading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center text-cyan-400 font-mono">
        <h1 className="text-5xl font-bold mb-6 animate-pulse">
          MUSTAFA.AI
        </h1>

        <div className="w-72 h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-400 animate-pulse w-full" />
        </div>

        <p className="mt-6 text-zinc-400">
          Initializing DevSecOps Systems...
        </p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* PARTICLES */}
      <Particles
        id="tsparticles"
        init={loadSlim}
        options={{
          background: {
            color: {
              value: "#000000",
            },
          },
          particles: {
            color: {
              value: "#00ffff",
            },
            links: {
              color: "#00ffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
            },
            number: {
              value: 60,
            },
            opacity: {
              value: 0.4,
            },
            size: {
              value: 2,
            },
          },
        }}
      />

      {/* CYBER GRID */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#00ffff22_1px,transparent_1px),linear-gradient(to_bottom,#00ffff22_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center"
        >

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              SOC Analyst • DevOps Engineer • Cloud Security
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Syed Mustafa Ali
            </h1>

            <h2 className="text-cyan-400 text-2xl font-semibold mt-6">
              <Typewriter
                words={[
                  "DevSecOps",
                  "Cloud Security",
                  "Kubernetes",
                  "CI/CD Engineering",
                  "Threat Hunting",
                  "Infrastructure as Code",
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </h2>

            <p className="mt-8 text-zinc-400 text-lg leading-relaxed max-w-2xl">
              Building secure, scalable, cloud-native systems with cybersecurity,
              DevOps, Kubernetes, Docker, Terraform, AWS, and automation.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <a
                href="https://github.com/musz2"
                target="_blank"
                className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition text-black font-semibold"
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

            {/* TERMINAL */}
            <div className="bg-black border border-cyan-500/20 rounded-3xl p-6 font-mono text-green-400 mt-16">

              <div className="mb-4">
                <FaTerminal className="text-cyan-400 text-2xl" />
              </div>

              <p className="mb-4">{output}</p>

              <input
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleCommand}
                className="bg-transparent outline-none w-full"
                placeholder="Type command..."
              />

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative">

            {/* 3D GLOBE */}
            <div className="h-[500px] w-full">

              <Canvas>

                <ambientLight intensity={1.5} />

                <directionalLight position={[3, 2, 1]} />

                <Sphere args={[1, 100, 200]} scale={2.2}>

                  <meshStandardMaterial
                    color="#00ffff"
                    wireframe
                  />

                </Sphere>

                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={2}
                />

              </Canvas>

            </div>

          </div>

        </motion.div>

      </section>

      {/* GITHUB STATS */}
      <section className="relative z-10 py-32 px-6">

        <div className="max-w-6xl mx-auto rounded-3xl bg-white/5 border border-white/10 p-8">

          <div className="flex items-center gap-4 mb-6">
            <FaGithub className="text-3xl text-cyan-400" />
            <h2 className="text-3xl font-bold">GitHub Activity</h2>
          </div>

          <GitHubCalendar username="musz2" />

        </div>

      </section>

      {/* THREAT DASHBOARD */}
      <section className="relative z-10 py-20 px-6">

        <div className="max-w-6xl mx-auto rounded-3xl border border-red-500/20 bg-red-500/5 p-8">

          <h2 className="text-4xl font-black mb-10 text-red-400">
            Global Threat Activity
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="rounded-2xl bg-black/40 p-6 border border-red-500/20">
              <p className="text-zinc-500">Blocked Attacks</p>
              <h3 className="text-5xl font-black text-red-400">12K</h3>
            </div>

            <div className="rounded-2xl bg-black/40 p-6 border border-cyan-500/20">
              <p className="text-zinc-500">Incidents</p>
              <h3 className="text-5xl font-black text-cyan-400">317</h3>
            </div>

            <div className="rounded-2xl bg-black/40 p-6 border border-purple-500/20">
              <p className="text-zinc-500">Threat Intel</p>
              <h3 className="text-5xl font-black text-purple-400">98%</h3>
            </div>

            <div className="rounded-2xl bg-black/40 p-6 border border-green-500/20">
              <p className="text-zinc-500">Servers Secure</p>
              <h3 className="text-5xl font-black text-green-400">24/7</h3>
            </div>

          </div>

        </div>

      </section>

      {/* AI ASSISTANT */}
      <div className="fixed bottom-6 right-6 z-50">

        <button className="w-16 h-16 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-2xl shadow-cyan-500/50 hover:scale-110 transition">

          <FaRobot className="text-2xl" />

        </button>

      </div>

    </main>
  )
}
```
