"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { HeroScene } from "./HeroScene";
import { ProjectModules } from "./ProjectModules";
import { WavingAstronaut } from "./WavingAstronaut";

export function MissionControlPortfolio() {
  const { scrollYProgress } = useScroll();
  const layerOpacity = useTransform(scrollYProgress, [0, 0.28, 0.48], [0.15, 0.65, 1]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#02050c] text-slate-100">
      <section className="relative grid min-h-screen overflow-hidden lg:grid-cols-[1fr_2fr]">
        <HeroScene missionEntered={false} />
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] bg-[size:72px_72px]"
          style={{ opacity: layerOpacity, y: gridY }}
        />
        <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_67%_50%,transparent_0,rgba(2,5,12,0.05)_34%,rgba(2,5,12,0.88)_100%)]" />
        <div className="relative z-30 flex min-h-screen items-center justify-center border-cyan-300/15 bg-[#02050c]/72 backdrop-blur-sm lg:border-r">
          <div className="flex w-full justify-center px-5 py-6 md:px-8 md:py-8 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-40 flex w-full max-w-2xl flex-col"
            >
              <h1 className="max-w-2xl text-4xl font-semibold leading-[0.95] tracking-normal text-white sm:text-5xl lg:text-6xl">
                Sanjana&apos;s Portfolio
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Hi! I am Sanjana, I am working in Aerospace Software and R&D at MDA Space. Come take a space walk through my projects with me. 
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
              </div>
            </motion.div>
          </div>
        </div>
        <div className="pointer-events-none relative z-30 hidden min-h-screen lg:block" />
      </section>

      <section
        id="astronaut"
        aria-label="Waving astronaut section"
        className="relative z-40 min-h-screen overflow-hidden border-t border-cyan-300/15 bg-[#020713] px-5 py-20 md:px-8 lg:px-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.06)_1px,transparent_1px)] bg-[size:88px_88px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_46%,rgba(34,211,238,0.16)_0,transparent_32%),radial-gradient(circle_at_78%_70%,rgba(250,204,21,0.08)_0,transparent_24%)]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl items-center gap-10 lg:grid-cols-[minmax(320px,460px)_minmax(0,1fr)]">
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto aspect-square w-full max-w-[390px] lg:mx-0 lg:justify-self-center"
          >
            <WavingAstronaut />
          </motion.div>
          <div className="hidden lg:block" aria-hidden="true" />
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
