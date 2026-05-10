"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type TelemetryItem = {
  label: string;
  value: string;
  unit: string;
};

const channels = ["NAV", "GNC", "COMMS", "THERM", "EPS", "PAYLOAD", "SIM"];

function makeFeedItem(index: number) {
  const channel = channels[index % channels.length];
  const value = (92 + Math.sin(Date.now() / 900 + index) * 6 + Math.random() * 1.8).toFixed(2);
  return `${new Date().toLocaleTimeString("en-US", { hour12: false })}  ${channel.padEnd(
    7,
    " ",
  )}  ${value}%  link nominal`;
}

export function TelemetryOverlay() {
  const [feed, setFeed] = useState<string[]>(() =>
    Array.from({ length: 8 }, (_, index) => makeFeedItem(index)),
  );
  const [tick, setTick] = useState(0);
  const metrics: TelemetryItem[] = useMemo(
    () => [
      { label: "Apoapsis", value: `${(421 + Math.sin(tick / 4) * 2.4).toFixed(1)}`, unit: "km" },
      { label: "Velocity", value: `${(7.66 + Math.cos(tick / 5) * 0.02).toFixed(2)}`, unit: "km/s" },
      { label: "Bus Temp", value: `${(22.4 + Math.sin(tick / 6) * 1.8).toFixed(1)}`, unit: "C" },
      { label: "Signal", value: `${(97.8 + Math.cos(tick / 3) * 0.9).toFixed(1)}`, unit: "%" },
    ],
    [tick],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTick((current) => current + 1);
      setFeed((current) => [makeFeedItem(current.length), ...current].slice(0, 10));
    }, 1450);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 42 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-40 self-end md:self-center"
    >
      <div className="border border-cyan-300/20 bg-slate-950/38 p-4 shadow-[0_0_60px_rgba(14,165,233,0.12)] backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between gap-4 border-b border-cyan-300/15 pb-3 font-mono text-xs uppercase tracking-[0.24em] text-cyan-100">
          <span>Live Telemetry</span>
          <span className="flex items-center gap-2 text-[10px] text-emerald-200">
            <span className="h-2 w-2 animate-ping rounded-full bg-emerald-300" />
            Online
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="border border-white/10 bg-white/[0.035] p-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                {metric.label}
              </div>
              <div className="mt-2 flex items-end gap-1 font-mono">
                <span className="text-2xl text-cyan-100">{metric.value}</span>
                <span className="pb-1 text-[10px] uppercase text-slate-500">{metric.unit}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 h-56 overflow-hidden border border-cyan-300/15 bg-black/30 p-3">
          <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            <span>Data Stream</span>
            <span>Auto-scroll</span>
          </div>
          <motion.div layout className="space-y-2 font-mono text-[11px] leading-5 text-cyan-100/85">
            {feed.map((item, index) => (
              <motion.div
                key={`${item}-${index}`}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: index > 7 ? 0.4 : 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex gap-2"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
}
