"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

type OrbitSide = "left" | "right";

type OrbitPosition = {
  left: number;
  top: number;
  side: OrbitSide;
};

type Experience = {
  id: string;
  company: string;
  logo: string;
  role: string;
  domain: string;
  date: string;
  overview: string;
  responsibilities: string[];
  techStack: string[];
  orbit: OrbitPosition;
};

const experiences: Experience[] = [
  {
    id: "mda",
    company: "MDA Space",
    logo: "MDA",
    role: "Software Engineer",
    domain: "Software, Physics, Aerospace, Research and Development",
    date: "June 2023 - Present",
    overview:
      "Contributed to three satellite R&D projects focused on on-board vessel detection and enhanced maritime surveillance capabilities.",
    responsibilities: [
      "Developed the full Python backend system for the project ground segment, enabling telemetry parsing, product parsing, satellite uplink, and GUIs for usability.",
      "Used SQL, databases, bit-level manipulation, CI/CD, and PyTest.",
      "Performed EGSE and AIT operations using Python.",
      "Designed and performed the Factory Acceptance Test for project completion.",
      "Designed and implemented a spacecraft testing program adopted by the AIT team, improving test efficiency and repeatability.",
      "Reduced average operator test time from 3 hours to 7 minutes.",
      "Conducted MATLAB research on compact polarization for vessel detection, including literature review, algorithm implementation, and experimental validation.",
      "Implemented and benchmarked detection algorithms from academic papers, performing competitive analysis to improve vessel detection accuracy and robustness.",
    ],
    techStack: ["Python", "SQL", "PyTest", "CI/CD", "MATLAB", "AIT", "EGSE", "Telemetry"],
    orbit: { left: 78, top: 11, side: "left" },
  },
  {
    id: "dwave",
    company: "D-Wave Systems",
    logo: "DW",
    role: "Electrical Engineer",
    domain: "Software, Physics, Electrical Engineering",
    date: "Sept. 2022 - Dec. 2022",
    overview:
      "Worked on embedded controls and tooling for quantum-computing hardware systems.",
    responsibilities: [
      "Worked with embedded firmware in C using the STM32 microcontroller.",
      "Wrote communication protocols for remotely controlled power systems over Ethernet.",
      "Created a Python GUI with an approachable user interface to control power supplies.",
      "Worked on a project to demagnify electronics used in quantum computers.",
    ],
    techStack: ["C", "STM32", "Python", "Ethernet", "Firmware", "Power Systems"],
    orbit: { left: 60, top: 34, side: "right" },
  },
  {
    id: "ubc",
    company: "UBC Physics and Astronomy",
    logo: "UBC",
    role: "Junior Research Engineer",
    domain: "Software, Physics Research",
    date: "May 2021 - Sept. 2021",
    overview:
      "Supported physics research through MATLAB analysis, modeling, optics experiments, and technical reporting.",
    responsibilities: [
      "Used MATLAB to analyze data with visualization techniques and statistical models.",
      "Built models to categorize and interpret data by researching and calculating differential equations.",
      "Reduced research result uncertainty by 50%.",
      "Designed and conducted optics physics experiments independently, including hypothesis creation, apparatus selection, equipment setup, data analysis, and conclusions.",
      "Presented results to the team through presentations and reports.",
    ],
    techStack: ["MATLAB", "Data Viz", "Statistics", "Differential Equations", "Optics"],
    orbit: { left: 38, top: 59, side: "right" },
  },
  {
    id: "intel",
    company: "Intel of Canada, Ltd.",
    logo: "INT",
    role: "Undergrad Software Intern - ECC, Software, FPGA Design",
    domain: "Software, HDL, Math",
    date: "Sept. 2020 - May 2021",
    overview:
      "Worked on ECC algorithms, digital-logic verification, and intern engagement analytics.",
    responsibilities: [
      "Implemented Error Correction Code algorithms and designed tests in C, Verilog, and Python.",
      "Verified conversion of ECC algorithms to digital logic.",
      "Improved algorithms that correct code up to 30% faster.",
      "Co-led a PowerBI project that used statistics to improve intern experience and engagement at Intel.",
      "Started a group promoting women in STEM through technical tutorials and networking sessions for female-identifying co-ops.",
    ],
    techStack: ["C", "Verilog", "Python", "FPGA", "ECC", "PowerBI", "Statistics"],
    orbit: { left: 62, top: 84, side: "left" },
  },
];

const traceLengths = [0.18, 0.44, 0.7, 0.96];

const particles = [
  { left: "7%", top: "16%", delay: 0, duration: 8 },
  { left: "18%", top: "76%", delay: 1.2, duration: 10 },
  { left: "31%", top: "24%", delay: 2.1, duration: 9 },
  { left: "48%", top: "84%", delay: 0.7, duration: 11 },
  { left: "64%", top: "18%", delay: 1.8, duration: 8.5 },
  { left: "76%", top: "62%", delay: 0.3, duration: 9.5 },
  { left: "88%", top: "30%", delay: 1.5, duration: 10.5 },
  { left: "94%", top: "80%", delay: 2.7, duration: 8.8 },
];

export function WorkExperienceTimeline() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const activeExperience = activeIndex === null ? null : experiences[activeIndex];
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { damping: 24, stiffness: 90 });
  const smoothY = useSpring(pointerY, { damping: 24, stiffness: 90 });
  const orbitX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const orbitY = useTransform(smoothY, [-1, 1], [-7, 7]);
  const panelX = useTransform(smoothX, [-1, 1], [6, -6]);
  const panelY = useTransform(smoothY, [-1, 1], [5, -5]);

  const updateParallax = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const resetParallax = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  useEffect(() => {
    const clearSelectionOutsideTimeline = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) {
        return;
      }

      setActiveIndex(null);
    };

    document.addEventListener("pointerdown", clearSelectionOutsideTimeline);

    return () => {
      document.removeEventListener("pointerdown", clearSelectionOutsideTimeline);
    };
  }, []);

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full overflow-hidden"
      onPointerDown={() => setActiveIndex(null)}
      onPointerLeave={resetParallax}
      onPointerMove={updateParallax}
    >
      <div className="pointer-events-none absolute inset-0">
        {particles.map((particle) => (
          <motion.span
            key={`${particle.left}-${particle.top}`}
            animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -18, 0] }}
            className="absolute h-1 w-1 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(165,243,252,0.85)]"
            style={{ left: particle.left, top: particle.top }}
            transition={{
              delay: particle.delay,
              duration: particle.duration,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <h2 className="relative font-mono text-lg font-semibold uppercase tracking-[0.22em] text-cyan-100 md:text-xl">
        Technical Work Experience
      </h2>

      <div className="relative mt-6 grid gap-6 xl:grid-cols-[minmax(340px,400px)_minmax(500px,1fr)] xl:items-stretch">
        <motion.div
          className="relative min-h-[660px] overflow-visible"
          style={{ x: orbitX, y: orbitY }}
        >
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 420 660"
          >
            <defs>
              <filter id="orbitGlow">
                <feGaussianBlur result="blur" stdDeviation="4" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M246 620C104 520 94 374 202 292C306 213 348 129 333 54"
              fill="none"
              stroke="rgba(103,232,249,0.18)"
              strokeDasharray="10 12"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <motion.path
              key={activeExperience?.id ?? "standby"}
              animate={{ pathLength: activeIndex === null ? 0 : traceLengths[activeIndex] }}
              d="M246 620C104 520 94 374 202 292C306 213 348 129 333 54"
              fill="none"
              filter="url(#orbitGlow)"
              initial={{ pathLength: 0 }}
              stroke="rgba(34,211,238,0.9)"
              strokeLinecap="round"
              strokeWidth="3"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          {experiences.map((experience, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={experience.id}
                className="absolute z-10"
                style={{
                  left: `${experience.orbit.left}%`,
                  top: `${experience.orbit.top}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  onPointerDown={(event) => event.stopPropagation()}
                  whileHover={{ y: -7, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group flex items-center gap-3 ${
                    experience.orbit.side === "left" ? "flex-row-reverse" : ""
                  } focus:outline-none`}
                >
                  <motion.span
                    animate={{
                      boxShadow: isActive
                        ? [
                            "0 0 18px rgba(103,232,249,0.8)",
                            "0 0 34px rgba(34,211,238,1)",
                            "0 0 18px rgba(103,232,249,0.8)",
                          ]
                        : [
                            "0 0 10px rgba(103,232,249,0.35)",
                            "0 0 18px rgba(103,232,249,0.65)",
                            "0 0 10px rgba(103,232,249,0.35)",
                          ],
                    }}
                    className={`h-5 w-5 shrink-0 rounded-full border ${
                      isActive
                        ? "border-cyan-100 bg-cyan-200"
                        : "border-cyan-200/70 bg-[#020713]"
                    }`}
                    transition={{ duration: 2.1, repeat: Infinity }}
                  />
                  <span
                    className={`h-px w-12 shrink-0 bg-gradient-to-r transition duration-300 ${
                      experience.orbit.side === "left"
                        ? isActive
                          ? "from-transparent via-cyan-300 to-cyan-100 shadow-[0_0_16px_rgba(103,232,249,0.95)]"
                          : "from-transparent via-cyan-300/20 to-cyan-300/40 group-hover:via-cyan-300/80 group-hover:to-cyan-100 group-hover:shadow-[0_0_14px_rgba(103,232,249,0.75)]"
                        : isActive
                          ? "from-cyan-100 via-cyan-300 to-transparent shadow-[0_0_16px_rgba(103,232,249,0.95)]"
                          : "from-cyan-300/40 via-cyan-300/20 to-transparent group-hover:from-cyan-100 group-hover:via-cyan-300/80 group-hover:shadow-[0_0_14px_rgba(103,232,249,0.75)]"
                    }`}
                  />
                  <span
                    className={`block w-72 border p-4 text-left backdrop-blur-xl transition duration-300 ${
                      isActive
                        ? "border-cyan-200/70 bg-slate-900/86 shadow-[0_0_34px_rgba(34,211,238,0.18)]"
                        : "border-cyan-300/18 bg-slate-950/58 group-hover:border-cyan-200/55 group-hover:bg-slate-900/74"
                    }`}
                  >
                    <span className="block font-mono text-xs uppercase tracking-[0.16em] text-emerald-100/80">
                      {experience.date}
                    </span>
                    <span className="mt-2 block text-lg font-semibold leading-6 text-white">
                      {experience.role}
                    </span>
                    <span className="mt-2 flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-[0.15em] text-cyan-200/80">
                      {experience.company}
                      <span className="text-cyan-100">&gt;</span>
                    </span>
                  </span>
                </motion.button>
              </div>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          {activeExperience ? (
            <motion.article
              key={activeExperience.id}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              className="relative min-h-[660px] overflow-hidden border border-cyan-300/30 bg-slate-950/62 p-6 shadow-[0_0_70px_rgba(14,165,233,0.18)] backdrop-blur-2xl"
              exit={{ opacity: 0, x: 28, scale: 0.98 }}
              initial={{ opacity: 0, x: 36, scale: 0.98 }}
              onPointerDown={(event) => event.stopPropagation()}
              style={{ x: panelX, y: panelY }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent opacity-70" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(34,211,238,0.16),transparent_28%)]" />
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="relative z-10 flex h-full flex-col"
                exit={{ opacity: 0, x: -18 }}
                initial={{ opacity: 0, x: 18 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-cyan-200/50 bg-cyan-300/10 font-mono text-lg font-semibold uppercase tracking-[0.08em] text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.18)]">
                      {activeExperience.logo}
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-200/80">
                        Mission Detail Panel
                      </div>
                      <h3 className="mt-3 text-3xl font-semibold leading-9 tracking-normal text-white">
                        {activeExperience.role}
                      </h3>
                      <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-slate-400">
                        {activeExperience.company} / {activeExperience.date}
                      </p>
                    </div>
                  </div>
                  <div className="border border-emerald-300/20 bg-emerald-300/8 px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] text-emerald-100">
                    Active orbit
                  </div>
                </div>

                <div className="mt-8 space-y-7">
                  <section>
                    <h4 className="font-mono text-sm uppercase tracking-[0.2em] text-cyan-100">
                      Overview
                    </h4>
                    <p className="mt-3 text-base leading-7 text-slate-300">
                      {activeExperience.overview}
                    </p>
                  </section>

                  <section>
                    <h4 className="font-mono text-sm uppercase tracking-[0.2em] text-cyan-100">
                      Key Responsibilities
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {activeExperience.responsibilities.map((responsibility) => (
                        <li key={responsibility} className="flex gap-3 text-sm leading-6 text-slate-300">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.7)]" />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h4 className="font-mono text-sm uppercase tracking-[0.2em] text-cyan-100">
                      Tech Stack
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeExperience.techStack.map((item) => (
                        <span
                          key={item}
                          className="border border-cyan-200/20 bg-cyan-300/8 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.08)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </motion.div>
            </motion.article>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
