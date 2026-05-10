export type Project = {
  id: string;
  title: string;
  classification: string;
  summary: string;
  stack: string[];
  signal: string;
};

export const projects: Project[] = [
  {
    id: "orbital-ui",
    title: "Orbital Operations UI",
    classification: "Interface Systems",
    summary:
      "Mission-planning dashboard for visualizing trajectory windows, risk posture, and procedure status across operational phases.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Telemetry UX"],
    signal: "98.4",
  },
  {
    id: "flight-core",
    title: "Flight Software Console",
    classification: "Control Software",
    summary:
      "Realtime command surface designed around validation, state awareness, and clear operator feedback for critical actions.",
    stack: ["React", "State Machines", "WebSockets", "Testing"],
    signal: "96.9",
  },
  {
    id: "sim-lab",
    title: "Simulation Analysis Lab",
    classification: "Modeling and Simulation",
    summary:
      "Analysis workspace for inspecting simulation runs, comparing subsystem traces, and surfacing anomalies in noisy data.",
    stack: ["Three.js", "Data Viz", "Python APIs", "Framer Motion"],
    signal: "94.7",
  },
];
