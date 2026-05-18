"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { projects } from "./projects";

export function ProjectModules() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-4xl font-semibold tracking-normal text-white md:text-6xl">
            Projects
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400 md:text-right">
          Personal projects I&apos;ve worked on throughout the years.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {projects.map((project, index) => (
          <motion.a
            key={project.id}
            href={project.href}
            aria-label={`Open ${project.title} project page`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex h-full flex-col overflow-hidden border border-cyan-300/16 bg-slate-950/48 p-5 text-left no-underline backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/50 hover:bg-slate-900/64 focus:outline-none focus-visible:border-cyan-200 focus-visible:ring-2 focus-visible:ring-cyan-200/50"
          >
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent opacity-40 transition group-hover:opacity-90" />
            <div className="relative -mx-5 -mt-5 mb-6 aspect-square overflow-hidden border-b border-cyan-300/14 bg-slate-950">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover opacity-80 saturate-[0.85] transition duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:saturate-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/12 to-cyan-300/8" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-cyan-200/40 shadow-[0_0_18px_rgba(103,232,249,0.55)]" />
            </div>
            <div className="mb-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
                {project.classification}
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-normal text-white">{project.title}</h3>
            </div>
            <p className="flex-1 text-sm leading-6 text-slate-300">{project.summary}</p>
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
            <div className="mt-8 flex items-center justify-between border-t border-cyan-300/12 pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-100/70 transition group-hover:text-cyan-100">
              <span>Open project</span>
              <span aria-hidden="true">&gt;</span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
