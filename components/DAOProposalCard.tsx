"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { DAOProposal } from "@/types";

interface DAOProposalCardProps {
  proposal: DAOProposal;
  currentUserVotingPower: number;
}

function useCountdown(deadline: string) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calc = () => {
      const diff = new Date(deadline).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("Ended");
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setTimeLeft(`${d}d ${h}h ${m}m`);
    };
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, [deadline]);

  return timeLeft;
}

export default function DAOProposalCard({
  proposal,
  currentUserVotingPower,
}: DAOProposalCardProps) {
  const [voted, setVoted] = useState<"yes" | "no" | null>(null);
  const [loading, setLoading] = useState(false);
  const [walletConnected] = useState(currentUserVotingPower > 0);
  const countdown = useCountdown(proposal.deadline);

  const total = proposal.yesVotes + proposal.noVotes || 1;
  const yesPct = (proposal.yesVotes / total) * 100;
  const noPct = (proposal.noVotes / total) * 100;

  const handleVote = async (vote: "yes" | "no") => {
    if (!walletConnected || voted) return;
    setLoading(true);
    try {
      await fetch("/api/dao/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposalId: proposal.id, vote }),
      });
      setVoted(vote);
    } finally {
      setLoading(false);
    }
  };

  const truncated =
    proposal.pitch.length > 120
      ? proposal.pitch.slice(0, 120) + "…"
      : proposal.pitch;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-5"
      style={{ background: "#0F1419", border: "1px solid #C9A84C22" }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-xs text-white/40 mb-0.5">Founder</p>
          <p
            className="font-semibold"
            style={{ fontFamily: "Playfair Display, serif", color: "#C9A84C" }}
          >
            {proposal.founderName}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/40 mb-0.5">Requested</p>
          <p className="font-bold text-white">
            ${proposal.requestedAmount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Pitch */}
      <p className="text-sm text-white/70 mb-4 leading-relaxed">{truncated}</p>

      {/* Deadline */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-white/40">⏱ Ends in</span>
        <span className="text-xs font-semibold" style={{ color: "#C9A84C" }}>
          {countdown}
        </span>
      </div>

      {/* Vote bars */}
      <div className="space-y-2 mb-5">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-green-400">Yes</span>
            <span className="text-white/50">{proposal.yesVotes} votes</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-2 rounded-full bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${yesPct}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-red-400">No</span>
            <span className="text-white/50">{proposal.noVotes} votes</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-2 rounded-full bg-red-500"
              initial={{ width: 0 }}
              animate={{ width: `${noPct}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            />
          </div>
        </div>
      </div>

      {/* Vote buttons / wallet prompt */}
      {!walletConnected ? (
        <div
          className="rounded-xl p-3 text-center text-sm"
          style={{ background: "#080C12", border: "1px solid #C9A84C33", color: "#C9A84C" }}
        >
          Connect your wallet to vote
        </div>
      ) : voted ? (
        <div
          className="rounded-xl p-3 text-center text-sm font-semibold"
          style={{ color: "#C9A84C" }}
        >
          ✓ You voted {voted.toUpperCase()} · Power: {currentUserVotingPower}
        </div>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => handleVote("yes")}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50"
            style={{ background: "#16a34a22", border: "1px solid #16a34a", color: "#4ade80" }}
          >
            👍 Yes
          </button>
          <button
            onClick={() => handleVote("no")}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50"
            style={{ background: "#dc262622", border: "1px solid #dc2626", color: "#f87171" }}
          >
            👎 No
          </button>
        </div>
      )}
    </motion.div>
  );
}
