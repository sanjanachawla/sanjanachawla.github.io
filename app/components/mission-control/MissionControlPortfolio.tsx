"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { HeroScene } from "./HeroScene";
import { ProjectModules } from "./ProjectModules";

export function MissionControlPortfolio() {
  const [missionEntered, setMissionEntered] = useState(false);
  const projectsRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const layerOpacity = useTransform(scrollYProgress, [0, 0.28, 0.48], [0.15, 0.65, 1]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const enterMission = () => {
    setMissionEntered(true);
    projectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#02050c] text-slate-100">
      <section className="relative grid min-h-screen overflow-hidden lg:grid-cols-[1fr_2fr]">
        <HeroScene missionEntered={missionEntered} />
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] bg-[size:72px_72px]"
          style={{ opacity: layerOpacity, y: gridY }}
        />
        <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_58%_44%,transparent_0,rgba(2,5,12,0.05)_34%,rgba(2,5,12,0.88)_100%)]" />
        <div className="relative z-30 flex min-h-screen items-start border-cyan-300/15 bg-[#02050c]/72 backdrop-blur-sm lg:border-r">
          <div className="w-full px-5 py-6 md:px-8 md:py-8 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-40 flex max-w-2xl flex-col"
            >
              <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-cyan-200">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
                Mission Control / Software Systems
              </div>
              <h1 className="max-w-2xl text-4xl font-semibold leading-[0.95] tracking-normal text-white sm:text-5xl lg:text-6xl">
                Sanjana&apos;s Portfolio
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Aerospace software engineering presented as an operational flight deck:
                precise interfaces, resilient systems, and calm telemetry under pressure.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={enterMission}
                  className="group relative h-12 overflow-hidden border border-cyan-300/50 bg-cyan-300/10 px-6 font-mono text-sm uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.18)] transition duration-300 hover:border-cyan-200 hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
                >
                  <span className="relative z-10">Enter Mission</span>
                  <span className="absolute inset-y-0 left-0 w-10 -translate-x-12 bg-cyan-100/30 blur-lg transition duration-500 group-hover:translate-x-44" />
                </button>
                <div className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">
                  Orbit link stable / T+ 00:47:12
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="pointer-events-none relative z-30 hidden min-h-screen lg:block" />
      </section>

      <section
        ref={projectsRef}
        id="projects"
        className="relative z-40 min-h-screen border-t border-cyan-300/15 bg-[#030814] px-5 py-24 md:px-8 lg:px-10"
      >
        <ProjectModules />
      </section>
    </main>
  );
}
