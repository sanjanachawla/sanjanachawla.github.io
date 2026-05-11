"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";

type ExperienceSection = {
  title?: string;
  bullets: string[];
};

type Experience = {
  company: string;
  role: string;
  domain: string;
  date: string;
  sections: ExperienceSection[];
};

const experiences: Experience[] = [
  {
    company: "MDA Space",
    role: "Software Engineer ",
    domain: "Software, Physics, Aerospace, Research and Development",
    date: "June 2023 - Present",
    sections: [
      {
        bullets: [
          "Contributed to three satellite R&D projects focused on on-board vessel detection and enhancing maritime surveillance capabilities.",
        ],
      },
      {
        title: "Vessel Detection On-board Processing",
        bullets: [
          "Developed the full Python backend system for the project ground segment, enabling telemetry parsing, product parsing, satellite uplink, and GUIs for usability.",
          "Used SQL, databases, bit-level manipulation, CI/CD, and PyTest.",
          "Performed EGSE and AIT operations using Python.",
          "Designed and performed the Factory Acceptance Test for project completion.",
        ],
      },
      {
        title: "AIT Testing",
        bullets: [
          "Designed and implemented a spacecraft testing program adopted by the AIT team, improving test efficiency and repeatability.",
          "Reduced average operator test time from 3 hours to 7 minutes.",
        ],
      },
      {
        title: "Research Work",
        bullets: [
          "Conducted MATLAB research on compact polarization for vessel detection, including literature review, algorithm implementation, and experimental validation.",
          "Implemented and benchmarked detection algorithms from academic papers, performing competitive analysis to improve vessel detection accuracy and robustness.",
          
        ],
      },
    ],
  },
  {
    company: "D-Wave Systems",
    role: "Electrical Engineer",
    domain: "Software, Physics, Electrical Engineering",
    date: "Sept. 2022 - Dec. 2022",
    sections: [
      {
        bullets: [
          "Worked with embedded firmware in C using the STM32 microcontroller, writing communication protocols for remotely controlled power systems over Ethernet.",
          "Created a Python GUI with an approachable user interface to control power supplies.",
          "Worked on a project to demagnify electronics used in quantum computers.",
        ],
      },
    ],
  },
  {
    company: "UBC Department of Physics and Astronomy",
    role: "Junior Research Engineer",
    domain: "Software, Physics Research",
    date: "May 2021 - Sept. 2021",
    sections: [
      {
        bullets: [
          "Used MATLAB to analyze data with visualization techniques and statistical models.",
          "Built models to categorize and interpret data by researching and calculating differential equations, reducing research result uncertainty by 50%.",
          "Designed and conducted optics physics experiments independently, including hypothesis creation, apparatus selection, equipment setup, data analysis, and conclusions.",
          "Presented results to the team through presentations and reports.",
        ],
      },
    ],
  },
  {
    company: "Intel of Canada, Ltd.",
    role: "Undergrad Software Intern - ECC, Software, FPGA Design",
    domain: "Software, HDL, Math",
    date: "Sept. 2020 - May 2021",
    sections: [
      {
        bullets: [
          "Implemented Error Correction Code algorithms and designed tests in C, Verilog, and Python to verify conversion of algorithms to digital logic.",
          "Improved algorithms that correct code up to 30% faster.",
          "Co-led a PowerBI project that used statistics to improve intern experience and engagement at Intel.",
          "Started a group promoting women in STEM through technical tutorials and networking sessions for female-identifying co-ops.",
        ],
      },
    ],
  },
];

export function WorkExperienceTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const hoverTimeoutRef = useRef<number | null>(null);
  const activeExperience = experiences[activeIndex];

  const clearPendingActivation = () => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const activateExperience = (index: number) => {
    clearPendingActivation();
    setActiveIndex(index);
  };

  const queueExperienceActivation = (index: number) => {
    clearPendingActivation();
    hoverTimeoutRef.current = window.setTimeout(() => {
      setActiveIndex(index);
      hoverTimeoutRef.current = null;
    }, 140);
  };

  const queueExperienceActivationFromPointer = (
    index: number,
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerY = event.clientY - bounds.top;
    const edgeGuard = Math.min(22, bounds.height * 0.28);

    if (pointerY < edgeGuard || pointerY > bounds.height - edgeGuard) {
      clearPendingActivation();
      return;
    }

    queueExperienceActivation(index);
  };

  useEffect(() => {
    return () => clearPendingActivation();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <h2 className="font-mono text-lg font-semibold uppercase tracking-[0.22em] text-cyan-100 md:text-xl">
        Technical Work Experience
      </h2>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(240px,320px)_minmax(0,1fr)] lg:items-stretch">
        <div className="relative pl-7">
          <div className="absolute bottom-4 left-[7px] top-4 w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/45 to-cyan-300/0" />
          <div className="space-y-3">
            {experiences.map((experience, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={`${experience.company}-${experience.date}`}
                  type="button"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => activateExperience(index)}
                  onFocus={() => activateExperience(index)}
                  onPointerEnter={(event) => queueExperienceActivationFromPointer(index, event)}
                  onPointerMove={(event) => queueExperienceActivationFromPointer(index, event)}
                  onPointerLeave={clearPendingActivation}
                  className={`group relative w-full border p-4 text-left backdrop-blur-xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-200/60 ${
                    isActive
                      ? "border-cyan-200/60 bg-slate-900/78 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
                      : "border-cyan-300/16 bg-slate-950/52 hover:border-cyan-200/45 hover:bg-slate-900/66"
                  }`}
                >
                  <span
                    className={`absolute -left-[27px] top-4 h-3.5 w-3.5 rounded-full border bg-[#020713] transition ${
                      isActive
                        ? "border-cyan-100 shadow-[0_0_20px_rgba(103,232,249,0.95)]"
                        : "border-cyan-100/70 shadow-[0_0_14px_rgba(103,232,249,0.5)]"
                    }`}
                  />
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-100/80">
                    {experience.date}
                  </div>
                  <h3 className="mt-2 text-base font-semibold leading-6 tracking-normal text-white">
                    {experience.role} - {experience.company}
                  </h3>
                </motion.button>
              );
            })}
          </div>
        </div>

        <motion.article
          key={`${activeExperience.company}-${activeExperience.date}`}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[520px] overflow-hidden border border-cyan-300/18 bg-slate-950/62 p-6 shadow-[0_0_55px_rgba(14,165,233,0.1)] backdrop-blur-xl"
        >
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent opacity-60" />
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-200/80">
                {activeExperience.company}
              </div>
              <h3 className="mt-3 text-3xl font-semibold leading-9 tracking-normal text-white">
                {activeExperience.role}
              </h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-slate-400">
                {activeExperience.domain}
              </p>
            </div>
            <div className="shrink-0 border border-emerald-300/20 bg-emerald-300/8 px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] text-emerald-100">
              {activeExperience.date}
            </div>
          </div>

          <div className="mt-7 max-h-[calc(100vh-20rem)] space-y-5 overflow-y-auto pr-2 lg:max-h-[500px]">
            {activeExperience.sections.map((section, sectionIndex) => (
              <div
                key={`${activeExperience.company}-${section.title ?? sectionIndex}`}
                className="border-l border-cyan-300/18 pl-4"
              >
                {section.title ? (
                  <h4 className="font-mono text-sm uppercase tracking-[0.18em] text-cyan-100">
                    {section.title}
                  </h4>
                ) : null}
                <ul className={section.title ? "mt-3 space-y-2" : "space-y-2"}>
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-base leading-7 text-slate-300">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.7)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}
