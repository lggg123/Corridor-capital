"use client";

import { motion } from "framer-motion";
import type { StriverScore } from "@/types";

interface StriverScoreProps {
  data: StriverScore;
}

const tierColors: Record<StriverScore["tier"], string> = {
  bronze: "#CD7F32",
  silver: "#C0C0C0",
  gold: "#C9A84C",
  platinum: "#E5E4E2",
};

export default function StriverScoreComponent({ data }: StriverScoreProps) {
  const { score, tier, signals } = data;
  const pct = ((score - 300) / (850 - 300)) * 100;
  const color = tierColors[tier];

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: "#0F1419", border: "1px solid #C9A84C22" }}
    >
      <h2
        className="font-playfair text-2xl mb-1"
        style={{ color: "#C9A84C", fontFamily: "Playfair Display, serif" }}
      >
        Striver Score
      </h2>
      <div className="flex items-end gap-3 mt-2 mb-4">
        <motion.span
          className="text-6xl font-bold"
          style={{ color }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {score}
        </motion.span>
        <span
          className="text-lg mb-2 capitalize font-semibold"
          style={{ color }}
        >
          {tier}
        </span>
      </div>

      {/* Score bar */}
      <div className="w-full h-2 rounded-full bg-white/10 mb-6">
        <motion.div
          className="h-2 rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      {/* Signals breakdown */}
      <div className="space-y-3">
        {signals.map((sig) => (
          <div key={sig.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="capitalize text-white/70">
                {sig.name.replace("_", " ")}
              </span>
              <span style={{ color: "#C9A84C" }}>{sig.value}/100</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10">
              <motion.div
                className="h-1.5 rounded-full"
                style={{ background: "#C9A84C" }}
                initial={{ width: 0 }}
                animate={{ width: `${sig.value}%` }}
                transition={{ duration: 0.8, delay: 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
