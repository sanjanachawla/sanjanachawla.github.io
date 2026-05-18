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

type PlanetTheme = {
  name: string;
  body: string;
  idleShadow: string[];
  activeShadow: string[];
  ringClassName?: string;
  band?: {
    background: string;
    height: string;
    top: string;
    transform: string;
  };
  spots?: Array<{
    background: string;
    className: string;
  }>;
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
      "Contributed to three satellite R&D projects focused on on-board vessel detection and enhancing maritime surveillance capabilities.",
    responsibilities: [
      "Vessel Detection On-board Processing",
      "Developed the full backend system in Python for the ground segment of this project, enabling the full data processing pipeline for telemetry and product parsing, uplink to the satellite, and created GUIs for usability.",
      "Used SQL, databases, bit-level manipulations, CI/CD, and PyTest.",
      "Performed EGSE (Electrical Ground Support Equipment) and AIT (Assembly, Integration, and Testing) operations using Python.",
      "Designed and performed the Factory Acceptance Test for project completion.",
      "AIT Testing",
      "Designed and implemented a new spacecraft testing program adopted by the AIT team, improving test efficiency and repeatability. Reduced average time taken for operators conducting tests from 3 hours to 7 minutes.",
      "Research Work",
      "Conducted research on Compact Polarization for Vessel Detection using MATLAB, including literature review, algorithm implementation, and experimental validation.",
      "Aided in implementing and benchmarking detection algorithms from academic papers, performing a competitive analysis of each algorithm to improve accuracy and robustness in vessel detection performances.",
      "Led company-wide events such as Fungineering and Women in Leadership.",
    ],
    techStack: ["Python", "SQL", "PyTest", "CI/CD", "MATLAB", "AIT", "EGSE", "Telemetry"],
    orbit: { left: 91, top: 12, side: "left" },
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
    orbit: { left: 80, top: 37.3, side: "left" },
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
    orbit: { left: 80, top: 62.7, side: "left" },
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
    orbit: { left: 91, top: 88, side: "left" },
  },
];

const orbitPath = "M382 58 A58 272 0 0 0 382 602";

const orbitGlowSegments = [
  { dashArray: "0.22 1", dashOffset: 0 },
  { dashArray: "0.22 1", dashOffset: -0.22 },
  { dashArray: "0.22 1", dashOffset: -0.57 },
  { dashArray: "0.22 1", dashOffset: -0.78 },
];

const planetThemes: PlanetTheme[] = [
  {
    name: "ice planet",
    body: "radial-gradient(circle at 34% 28%, #f0fdff 0 12%, #a5f3fc 24%, #38bdf8 58%, #075985 100%)",
    idleShadow: [
      "0 0 7px rgba(125,211,252,0.18)",
      "0 0 12px rgba(125,211,252,0.28)",
      "0 0 7px rgba(125,211,252,0.18)",
    ],
    activeShadow: [
      "0 0 18px rgba(186,230,253,0.85), 0 0 34px rgba(56,189,248,0.55)",
      "0 0 26px rgba(224,242,254,1), 0 0 52px rgba(34,211,238,0.9)",
      "0 0 18px rgba(186,230,253,0.85), 0 0 34px rgba(56,189,248,0.55)",
    ],
    band: {
      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.58), transparent)",
      height: "18%",
      top: "56%",
      transform: "rotate(-16deg)",
    },
  },
  {
    name: "ringed planet",
    body: "radial-gradient(circle at 34% 28%, #fef3c7 0 13%, #fbbf24 34%, #c2410c 67%, #4c0519 100%)",
    idleShadow: [
      "0 0 7px rgba(251,191,36,0.16)",
      "0 0 12px rgba(251,191,36,0.26)",
      "0 0 7px rgba(251,191,36,0.16)",
    ],
    activeShadow: [
      "0 0 18px rgba(253,230,138,0.85), 0 0 34px rgba(251,191,36,0.55)",
      "0 0 26px rgba(254,243,199,1), 0 0 54px rgba(245,158,11,0.88)",
      "0 0 18px rgba(253,230,138,0.85), 0 0 34px rgba(251,191,36,0.55)",
    ],
    ringClassName:
      "absolute left-1/2 top-1/2 h-2 w-10 -translate-x-1/2 -translate-y-1/2 rotate-[-17deg] rounded-full border border-amber-100/60 bg-amber-200/8 shadow-[0_0_10px_rgba(251,191,36,0.26)]",
    band: {
      background: "linear-gradient(90deg, transparent, rgba(253,230,138,0.55), transparent)",
      height: "14%",
      top: "46%",
      transform: "rotate(-11deg)",
    },
  },
  {
    name: "ocean planet",
    body: "radial-gradient(circle at 34% 28%, #d1fae5 0 12%, #2dd4bf 29%, #0f766e 58%, #052e16 100%)",
    idleShadow: [
      "0 0 7px rgba(45,212,191,0.16)",
      "0 0 12px rgba(45,212,191,0.26)",
      "0 0 7px rgba(45,212,191,0.16)",
    ],
    activeShadow: [
      "0 0 18px rgba(153,246,228,0.85), 0 0 34px rgba(45,212,191,0.55)",
      "0 0 26px rgba(204,251,241,1), 0 0 54px rgba(20,184,166,0.88)",
      "0 0 18px rgba(153,246,228,0.85), 0 0 34px rgba(45,212,191,0.55)",
    ],
    spots: [
      {
        background: "rgba(167,243,208,0.72)",
        className: "absolute left-[18%] top-[48%] h-2 w-4 rounded-full blur-[1px]",
      },
      {
        background: "rgba(240,253,250,0.48)",
        className: "absolute right-[16%] top-[30%] h-1.5 w-3 rounded-full blur-[1px]",
      },
    ],
  },
  {
    name: "red planet",
    body: "radial-gradient(circle at 34% 28%, #fed7aa 0 12%, #fb7185 30%, #be123c 62%, #450a0a 100%)",
    idleShadow: [
      "0 0 7px rgba(251,113,133,0.16)",
      "0 0 12px rgba(251,113,133,0.26)",
      "0 0 7px rgba(251,113,133,0.16)",
    ],
    activeShadow: [
      "0 0 18px rgba(254,205,211,0.85), 0 0 34px rgba(251,113,133,0.58)",
      "0 0 26px rgba(255,228,230,1), 0 0 54px rgba(244,63,94,0.9)",
      "0 0 18px rgba(254,205,211,0.85), 0 0 34px rgba(251,113,133,0.58)",
    ],
    spots: [
      {
        background: "rgba(127,29,29,0.5)",
        className: "absolute left-[18%] top-[52%] h-2 w-5 rounded-full blur-[1px]",
      },
      {
        background: "rgba(254,215,170,0.48)",
        className: "absolute right-[18%] top-[34%] h-1.5 w-3 rounded-full blur-[1px]",
      },
    ],
  },
];

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

const responsibilityHeadings = new Set([
  "Vessel Detection On-board Processing",
  "AIT Testing",
  "Research Work",
]);

export function WorkExperienceTimeline() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const activeExperience = activeIndex === null ? null : experiences[activeIndex];
  const activeOrbitSegment =
    activeIndex === null ? null : orbitGlowSegments[activeIndex];
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
      className="relative w-full overflow-visible"
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

      <div className="relative mt-5 space-y-3 xl:hidden">
        {experiences.map((experience, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={experience.id}
              className={`border backdrop-blur-xl transition duration-300 ${
                isActive
                  ? "border-cyan-100/75 bg-[#0d2b4c]/90 shadow-[0_0_36px_rgba(34,211,238,0.2)]"
                  : "border-cyan-200/24 bg-[#08213f]/72"
              }`}
              onPointerDown={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-controls={`${experience.id}-mobile-details`}
                aria-expanded={isActive}
                className="group w-full p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/50"
                onClick={() => setActiveIndex(isActive ? null : index)}
              >
                <span className="block font-mono text-xs uppercase tracking-[0.16em] text-emerald-100/80">
                  {experience.date}
                </span>
                <span className="mt-2 block break-words text-xl font-semibold leading-6 text-white">
                  {experience.role}
                </span>
                <span className="mt-2 block break-words font-mono text-xs uppercase tracking-[0.14em] text-cyan-200/80">
                  {experience.company}
                </span>
                <span className="mt-3 block text-sm leading-5 text-slate-300">
                  {experience.overview}
                </span>
                <span className="mt-4 flex items-center justify-between border-t border-cyan-200/14 pt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-100">
                  <span>{isActive ? "Details open" : "View details"}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 items-center justify-center border border-cyan-200/35 bg-cyan-300/8 text-base leading-none text-cyan-50 transition group-hover:border-cyan-100/70"
                  >
                    {isActive ? "-" : "+"}
                  </span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isActive ? (
                  <motion.div
                    id={`${experience.id}-mobile-details`}
                    animate={{ height: "auto", opacity: 1 }}
                    className="overflow-hidden"
                    exit={{ height: 0, opacity: 0 }}
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="border-t border-cyan-200/18 p-4 pt-5">
                      <ExperienceDetailContent experience={experience} />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="relative mt-4 hidden gap-5 xl:grid xl:grid-cols-[minmax(420px,450px)_minmax(540px,1fr)] xl:items-stretch">
        <motion.div
          className="relative h-[clamp(540px,calc(100vh-10rem),620px)] min-h-0 overflow-visible bg-[radial-gradient(circle_at_46%_50%,rgba(14,116,144,0.18),transparent_58%)]"
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
              d={orbitPath}
              fill="none"
              stroke="rgba(103,232,249,0.18)"
              strokeDasharray="10 12"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <motion.path
              animate={{
                opacity: activeOrbitSegment ? 1 : 0,
                strokeDashoffset: activeOrbitSegment?.dashOffset ?? 0,
              }}
              d={orbitPath}
              fill="none"
              filter="url(#orbitGlow)"
              initial={false}
              pathLength={1}
              stroke="rgba(34,211,238,0.9)"
              strokeDasharray={activeOrbitSegment?.dashArray ?? "0 1"}
              strokeLinecap="round"
              strokeWidth="3"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          {experiences.map((experience, index) => {
            const isActive = index === activeIndex;
            const planet = planetThemes[index];

            return (
              <div
                key={experience.id}
                className="absolute z-10"
                style={{
                  left: `${experience.orbit.left}%`,
                  top: `${experience.orbit.top}%`,
                  transform:
                    experience.orbit.side === "left"
                      ? "translate(calc(-100% + 10px), -50%)"
                      : "translate(-10px, -50%)",
                }}
              >
                <motion.button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  onPointerDown={(event) => event.stopPropagation()}
                  whileHover={{ y: -7, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group flex items-center gap-3 ${
                    experience.orbit.side === "left" ? "flex-row-reverse" : ""
                  } focus:outline-none`}
                >
                  <motion.span
                    aria-hidden="true"
                    animate={{
                      boxShadow: isActive ? planet.activeShadow : planet.idleShadow,
                      scale: isActive ? [1, 1.08, 1] : [1, 1.02, 1],
                    }}
                    className={`relative h-7 w-7 shrink-0 rounded-full transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-55"
                    }`}
                    title={planet.name}
                    transition={{ duration: isActive ? 1.7 : 2.4, repeat: Infinity }}
                  >
                    {planet.ringClassName ? (
                      <span className={planet.ringClassName} />
                    ) : null}
                    <span
                      className={`absolute inset-0 overflow-hidden rounded-full border ${
                        isActive ? "border-white/90" : "border-cyan-100/25"
                      }`}
                      style={{ background: planet.body }}
                    >
                      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.72),transparent_28%)]" />
                      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_74%_78%,rgba(0,0,0,0.42),transparent_46%)]" />
                      {planet.band ? (
                        <span
                          className="absolute left-[-16%] w-[132%] rounded-full opacity-80"
                          style={{
                            background: planet.band.background,
                            height: planet.band.height,
                            top: planet.band.top,
                            transform: planet.band.transform,
                          }}
                        />
                      ) : null}
                      {planet.spots?.map((spot) => (
                        <span
                          key={`${planet.name}-${spot.className}`}
                          className={spot.className}
                          style={{ background: spot.background }}
                        />
                      ))}
                    </span>
                  </motion.span>
                  <span
                    className={`h-px w-8 shrink-0 bg-gradient-to-r transition duration-300 ${
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
                    className={`block w-[16.5rem] border p-4 text-left backdrop-blur-xl transition duration-300 ${
                      isActive
                        ? "border-cyan-100/75 bg-[#0d2b4c]/90 shadow-[0_0_36px_rgba(34,211,238,0.22)]"
                        : "border-cyan-200/24 bg-[#08213f]/72 group-hover:border-cyan-100/60 group-hover:bg-[#0b294e]/82"
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
              className="relative h-[clamp(540px,calc(100vh-10rem),620px)] min-h-0 overflow-hidden border border-cyan-200/35 bg-[#08213f]/72 p-5 shadow-[0_0_70px_rgba(14,165,233,0.2)] backdrop-blur-2xl"
              exit={{ opacity: 0, x: 28, scale: 0.98 }}
              initial={{ opacity: 0, x: 36, scale: 0.98 }}
              onPointerDown={(event) => event.stopPropagation()}
              style={{ x: panelX, y: panelY }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent opacity-70" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(34,211,238,0.16),transparent_28%)]" />
              <ExperienceDetailContent experience={activeExperience} scrollable />
            </motion.article>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ExperienceDetailContent({
  experience,
  scrollable = false,
}: {
  experience: Experience;
  scrollable?: boolean;
}) {
  return (
    <div className="relative z-10 flex h-full flex-col">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-cyan-100/55 bg-cyan-200/12 font-mono text-base font-semibold uppercase tracking-[0.08em] text-cyan-50 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            {experience.logo}
          </div>
          <div className="min-w-0">
            <div className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-200/80">
              Mission Detail Panel
            </div>
            <h3 className="mt-2 break-words text-2xl font-semibold leading-7 tracking-normal text-white">
              {experience.role}
            </h3>
            <p className="mt-2 break-words font-mono text-xs uppercase tracking-[0.16em] text-slate-400">
              {experience.company} / {experience.date}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`mt-5 space-y-4 ${
          scrollable
            ? "min-h-0 flex-1 overflow-y-auto pr-2 [scrollbar-color:rgba(103,232,249,0.35)_transparent] [scrollbar-width:thin]"
            : ""
        }`}
      >
        <section>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-100">
            Overview
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {experience.overview}
          </p>
        </section>

        <section>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-100">
            Key Responsibilities
          </h4>
          <ul className="mt-2 space-y-1.5">
            {experience.responsibilities.map((responsibility) => {
              const isHeading = responsibilityHeadings.has(responsibility);

              return (
                <li
                  key={responsibility}
                  className={
                    isHeading
                      ? "pt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-100"
                      : "flex gap-3 text-[13px] leading-5 text-slate-300"
                  }
                >
                  {isHeading ? (
                    responsibility
                  ) : (
                    <>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.7)]" />
                      <span>{responsibility}</span>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-100">
            Tech Stack
          </h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {experience.techStack.map((item) => (
              <span
                key={item}
                className="border border-cyan-200/20 bg-cyan-300/8 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.08)]"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
