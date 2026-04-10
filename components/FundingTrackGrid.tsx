"use client";

import { motion } from "framer-motion";
import type { FundingTrack, FundingMode } from "@/types";

const ALL_TRACKS: FundingTrack[] = [
  { id: "revenue_advance", label: "Revenue Advance", description: "Up to 150% of monthly revenue", minScore: 300, maxAmount: 50000 },
  { id: "community_loan", label: "Community Loan", description: "Low-interest peer lending", minScore: 400, maxAmount: 25000 },
  { id: "dao_grant", label: "DAO Grant", description: "Non-dilutive community grant", minScore: 500, maxAmount: 10000 },
  { id: "equity_crowdfund", label: "Equity Crowdfund", description: "Raise from the corridor community", minScore: 600, maxAmount: 500000 },
  { id: "invoice_factoring", label: "Invoice Factoring", description: "Advance against outstanding invoices", minScore: 350, maxAmount: 100000 },
  { id: "micro_grant", label: "Micro Grant", description: "Seed funding for early-stage founders", minScore: 300, maxAmount: 5000 },
  { id: "accelerator_bridge", label: "Accelerator Bridge", description: "Bridge to next funding round", minScore: 650, maxAmount: 75000 },
  { id: "yield_backed", label: "Yield-Backed Loan", description: "Funded by investor yield vault", minScore: 550, maxAmount: 40000 },
  { id: "peer_lending", label: "Peer Lending", description: "Direct peer-to-peer loans", minScore: 420, maxAmount: 20000 },
  { id: "striver_reward", label: "Striver Reward", description: "Score-based milestone rewards", minScore: 700, maxAmount: 15000 },
];

interface FundingTrackGridProps {
  unlockedTracks: FundingMode[];
  onSelectTrack?: (track: FundingTrack) => void;
}

export default function FundingTrackGrid({ unlockedTracks, onSelectTrack }: FundingTrackGridProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold mb-4"
        style={{ color: "#C9A84C", fontFamily: "Playfair Display, serif" }}
      >
        Funding Tracks
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {ALL_TRACKS.map((track, i) => {
          const unlocked = unlockedTracks.includes(track.id);
          return (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => unlocked && onSelectTrack?.(track)}
              className="rounded-xl p-4 cursor-pointer relative overflow-hidden"
              style={{
                background: unlocked ? "#0F1419" : "#080C12",
                border: `1px solid ${unlocked ? "#C9A84C55" : "#ffffff15"}`,
                opacity: unlocked ? 1 : 0.5,
              }}
              whileHover={unlocked ? { scale: 1.03, borderColor: "#C9A84C" } : {}}
            >
              {!unlocked && (
                <div className="absolute top-2 right-2 text-xs text-white/30">🔒</div>
              )}
              <div
                className="text-sm font-semibold mb-1"
                style={{ color: unlocked ? "#C9A84C" : "#ffffff60" }}
              >
                {track.label}
              </div>
              <div className="text-xs text-white/50 leading-tight">{track.description}</div>
              <div className="text-xs mt-2" style={{ color: "#ffffff40" }}>
                Up to ${track.maxAmount.toLocaleString()}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
