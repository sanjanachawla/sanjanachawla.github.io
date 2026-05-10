"use client";

import { motion } from "framer-motion";
import { projects } from "./projects";

export function ProjectModules() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.32em] text-cyan-200">
            Mission Modules
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white md:text-6xl">
            Selected systems work
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400 md:text-right">
          These modules are structured for the old portfolio project data source.
          Replace the local project array with repository content when it is available.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden border border-cyan-300/16 bg-slate-950/48 p-5 backdrop-blur-xl transition duration-300 hover:border-cyan-200/50 hover:bg-slate-900/64"
          >
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent opacity-40 transition group-hover:opacity-90" />
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
                  {project.classification}
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-normal text-white">{project.title}</h3>
              </div>
              <div className="border border-emerald-300/20 bg-emerald-300/8 px-3 py-2 text-right font-mono">
                <div className="text-[9px] uppercase tracking-[0.18em] text-emerald-200/70">Signal</div>
                <div className="text-lg text-emerald-100">{project.signal}</div>
              </div>
            </div>
            <p className="min-h-28 text-sm leading-6 text-slate-300">{project.summary}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
