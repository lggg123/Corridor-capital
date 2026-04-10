"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import type { VaultStats } from "@/types";

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 2,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, step);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span style={{ color: "#C9A84C" }}>
      {prefix}
      {display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function YieldVaultWidget() {
  const [stats, setStats] = useState<VaultStats | null>(null);
  const [mode, setMode] = useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/vault/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {
        // Fallback mock data
        setStats({
          tvl: 4_280_000,
          apy: 8.4,
          monthlyYieldRedirected: 32_500,
          sparkline: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 86400000)
              .toISOString()
              .slice(0, 10),
            value: 7 + Math.random() * 3,
          })),
        });
      });
  }, []);

  if (!mounted || !stats) {
    return (
      <div
        className="rounded-2xl p-6 animate-pulse"
        style={{ background: "#0F1419", border: "1px solid #C9A84C22", minHeight: 300 }}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl p-6"
      style={{ background: "#0F1419", border: "1px solid #C9A84C33" }}
    >
      {/* Header */}
      <h2
        className="text-xl font-bold mb-1"
        style={{ color: "#C9A84C", fontFamily: "Playfair Display, serif" }}
      >
        Yield Vault
      </h2>
      <p className="text-xs text-white/40 mb-5">
        Your principal is never at risk — only yield goes to founders.
      </p>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div>
          <p className="text-xs text-white/40 mb-1">Total TVL</p>
          <p className="text-lg font-bold">
            <AnimatedNumber value={stats.tvl} prefix="$" decimals={0} />
          </p>
        </div>
        <div>
          <p className="text-xs text-white/40 mb-1">Current APY</p>
          <p className="text-lg font-bold">
            <AnimatedNumber value={stats.apy} suffix="%" decimals={1} />
          </p>
        </div>
        <div>
          <p className="text-xs text-white/40 mb-1">Yield → Founders</p>
          <p className="text-lg font-bold">
            <AnimatedNumber
              value={stats.monthlyYieldRedirected}
              prefix="$"
              decimals={0}
            />
            <span className="text-xs text-white/30 ml-1">/mo</span>
          </p>
        </div>
      </div>

      {/* Sparkline */}
      <div className="mb-5 rounded-xl overflow-hidden" style={{ height: 80 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stats.sparkline}>
            <YAxis domain={["auto", "auto"]} hide />
            <Tooltip
              contentStyle={{ background: "#0F1419", border: "1px solid #C9A84C44", color: "#fff" }}
              formatter={(v) => [`${typeof v === "number" ? v.toFixed(2) : v}%`, "APY"]}
              labelFormatter={(l) => l}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#C9A84C"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Deposit / Withdraw toggle */}
      <div
        className="flex rounded-xl overflow-hidden mb-4"
        style={{ border: "1px solid #C9A84C33" }}
      >
        {(["deposit", "withdraw"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="flex-1 py-2 text-sm font-semibold capitalize transition-colors"
            style={{
              background: mode === m ? "#C9A84C" : "transparent",
              color: mode === m ? "#080C12" : "#C9A84C",
            }}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in USDC"
          className="flex-1 rounded-xl px-4 py-3 text-white outline-none"
          style={{ background: "#080C12", border: "1px solid #C9A84C33" }}
        />
        <button
          className="px-5 py-3 rounded-xl font-semibold"
          style={{ background: "#C9A84C", color: "#080C12" }}
        >
          {mode === "deposit" ? "Deposit" : "Withdraw"}
        </button>
      </div>
    </motion.div>
  );
}
