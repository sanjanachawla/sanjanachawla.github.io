"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { HeroScene } from "./HeroScene";
import { ProjectModules } from "./ProjectModules";
import { WavingAstronaut } from "./WavingAstronaut";
import { WorkExperienceTimeline } from "./WorkExperienceTimeline";

export function MissionControlPortfolio() {
  const { scrollYProgress } = useScroll();
  const layerOpacity = useTransform(scrollYProgress, [0, 0.28, 0.48], [0.12, 0.5, 0.85]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#02050c] text-slate-100">
      <section id="home" className="relative min-h-screen overflow-hidden bg-[#02050c]">
        <HeroScene missionEntered={false} />
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(56,189,248,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.045)_1px,transparent_1px)] bg-[size:88px_88px]"
          style={{ opacity: layerOpacity, y: gridY }}
        />
        <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_74%_16%,rgba(191,219,254,0.3)_0,rgba(56,189,248,0.08)_18%,transparent_38%),radial-gradient(circle_at_58%_36%,transparent_0,rgba(2,5,12,0.08)_42%,rgba(2,5,12,0.72)_100%)] md:bg-[radial-gradient(circle_at_86%_8%,rgba(191,219,254,0.34)_0,rgba(56,189,248,0.08)_16%,transparent_34%),radial-gradient(circle_at_70%_48%,transparent_0,rgba(2,5,12,0.18)_42%,rgba(2,5,12,0.88)_100%)]" />
        <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(2,5,12,0.18)_0%,rgba(2,5,12,0.5)_42%,rgba(2,5,12,0.96)_100%)] md:bg-[linear-gradient(90deg,rgba(2,5,12,0.98)_0%,rgba(2,5,12,0.9)_34%,rgba(2,5,12,0.48)_58%,rgba(2,5,12,0.06)_100%)]" />

        <header className="absolute left-0 right-0 top-0 z-40 hidden justify-center px-6 py-7 md:flex lg:px-14">
          <nav
            aria-label="Primary navigation"
            className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.28em] text-slate-300 lg:gap-12"
          >
            <a className="border-b border-cyan-300 pb-1 text-white" href="#home">
              Home
            </a>
            <a className="transition hover:text-cyan-100" href="#astronaut">
              Experience
            </a>
            <a className="transition hover:text-cyan-100" href="#projects">
              Projects
            </a>
            <a className="transition hover:text-cyan-100" href="mailto:sanjanachawla99@gmail.com">
              Contact
            </a>
          </nav>
        </header>

        <div className="relative z-30 flex min-h-[100svh] items-start px-6 pb-20 pt-[20.5rem] sm:pt-[22rem] md:min-h-screen md:items-center md:px-10 md:pt-28 lg:px-[8vw] lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[39rem]"
          >
            <h1 className="max-w-[35rem] text-5xl font-light leading-[0.94] tracking-[0.02em] text-white sm:text-6xl lg:text-7xl">
              Sanjana&apos;s Portfolio
            </h1>
            <p className="mt-7 max-w-[36rem] text-lg leading-9 text-slate-300 sm:text-xl sm:leading-10">
              Hi! I am Sanjana, I am working in Aerospace Software and R&D at MDA Space. Come take a space walk through my projects with me.
            </p>

            <div className="mt-9 max-w-[38rem]">
              <table className="w-full border-collapse border-y border-cyan-300/25 bg-[#061832]/36 text-left backdrop-blur-sm">
                <tbody>
                  <tr className="border-b border-cyan-300/14">
                    <th className="w-32 px-4 py-4 align-top font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-200/75 sm:w-40 sm:text-xs">
                      Education
                    </th>
                    <td className="px-4 py-4 text-base leading-7 text-slate-100 sm:text-lg">
                      <span className="block">Bachelor of Applied Science in</span>
                      <span className="block">
                        <strong className="font-semibold text-yellow-300">Engineering Physics</strong> at UBC
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-cyan-300/14">
                    <th className="w-32 px-4 py-4 align-top font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-200/75 sm:w-40 sm:text-xs">
                      Working at
                    </th>
                    <td className="px-4 py-4 text-base leading-7 text-slate-100 sm:text-lg">
                      MDA Space
                    </td>
                  </tr>
                  <tr>
                    <th className="w-32 px-4 py-4 align-top font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-200/75 sm:w-40 sm:text-xs">
                      Location
                    </th>
                    <td className="px-4 py-4 text-base leading-7 text-slate-100 sm:text-lg">
                      Vancouver, BC, Canada
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-6">
                <div className="font-mono text-sm uppercase tracking-[0.28em] text-cyan-200/80">
                  Contact:
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-7 gap-y-3 text-lg text-slate-300 sm:text-xl">
                  <a
                    className="text-cyan-100 underline decoration-cyan-300/35 underline-offset-4 transition hover:text-white"
                    href="mailto:sanjanachawla99@gmail.com"
                  >
                    sanjanachawla99@gmail.com
                  </a>
                  <a
                    className="text-cyan-100 underline decoration-cyan-300/35 underline-offset-4 transition hover:text-white"
                    href="https://github.com/sanjanachawla"
                    rel="noreferrer"
                    target="_blank"
                  >
                    GitHub
                  </a>
                  <a
                    className="text-cyan-100 underline decoration-cyan-300/35 underline-offset-4 transition hover:text-white"
                    href="https://www.linkedin.com/in/sanjana-chawla/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </section>

      <section
        id="astronaut"
        aria-label="Work experience"
        className="relative z-40 min-h-screen border-t border-cyan-300/15 bg-[#061832] px-5 py-8 md:px-8 md:py-10 lg:px-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] bg-[size:88px_88px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_46%,rgba(34,211,238,0.2)_0,transparent_32%),radial-gradient(circle_at_78%_70%,rgba(125,211,252,0.1)_0,transparent_24%)]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1500px] items-start gap-8 lg:grid-cols-[minmax(280px,400px)_minmax(0,1fr)]">
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-square w-full max-w-[330px] overflow-visible lg:sticky lg:top-20 lg:mx-0 lg:max-w-[360px] lg:justify-self-center"
          >
            <div className="absolute inset-4 rounded-full bg-cyan-300/10 blur-3xl" />
            <motion.span
              animate={{ opacity: [0.25, 0.8, 0.25], y: [0, -16, 0] }}
              className="absolute left-[14%] top-[18%] h-1 w-1 rounded-full bg-cyan-100 shadow-[0_0_12px_rgba(165,243,252,0.9)]"
              transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
            />
            <motion.span
              animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -22, 0] }}
              className="absolute right-[12%] top-[34%] h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(165,243,252,0.8)]"
              transition={{ delay: 1.2, duration: 9, ease: "easeInOut", repeat: Infinity }}
            />
            <motion.span
              animate={{ opacity: [0.2, 0.65, 0.2], y: [0, -18, 0] }}
              className="absolute bottom-[18%] left-[24%] h-1 w-1 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.75)]"
              transition={{ delay: 2.4, duration: 8, ease: "easeInOut", repeat: Infinity }}
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              className="relative h-full w-full"
              transition={{ duration: 5.2, ease: "easeInOut", repeat: Infinity }}
            >
              <WavingAstronaut />
            </motion.div>
          </motion.div>
          <WorkExperienceTimeline />
        </div>
      </section>

      <section
        id="projects"
        className="relative z-40 min-h-screen border-t border-cyan-300/15 bg-[#030814] px-5 py-24 md:px-8 lg:px-10"
      >
        <ProjectModules />
      </section>
    </main>
  );
}
