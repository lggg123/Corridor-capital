"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import StriverScoreComponent from "@/components/StriverScore";
import FundingTrackGrid from "@/components/FundingTrackGrid";
import FundingApplicationModal from "@/components/FundingApplicationModal";
import DAOProposalCard from "@/components/DAOProposalCard";
import YieldVaultWidget from "@/components/YieldVaultWidget";
import type { StriverScore, ActivityItem, DAOProposal, FundingTrack } from "@/types";

interface FounderData {
  striverScore: StriverScore;
  activity: ActivityItem[];
  daoNotifications: DAOProposal[];
}

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const activityIcons: Record<string, string> = {
  score_update: "📊",
  track_unlock: "🔓",
  vote: "🗳️",
  funding: "💰",
  deposit: "🏦",
};

export default function DashboardPage() {
  const [data, setData] = useState<FounderData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<FundingTrack | null>(null);

  useEffect(() => {
    fetch("/api/founder/me")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#080C12" }}
      >
        <div className="text-white/40 animate-pulse">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#080C12" }}>
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "#C9A84C22" }}
      >
        <span
          className="text-xl font-bold"
          style={{ color: "#C9A84C", fontFamily: "Playfair Display, serif" }}
        >
          The Corridor Capital
        </span>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 rounded-xl font-semibold text-sm"
          style={{ background: "#C9A84C", color: "#080C12" }}
        >
          Apply for Funding
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* Striver Score */}
        <Section>
          <StriverScoreComponent data={data.striverScore} />
        </Section>

        {/* Funding Tracks */}
        <Section>
          <FundingTrackGrid
            unlockedTracks={data.striverScore.unlockedTracks}
            onSelectTrack={(track) => {
              setSelectedTrack(track);
              setShowModal(true);
            }}
          />
        </Section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activity Feed */}
          <Section>
            <div
              className="rounded-2xl p-6"
              style={{ background: "#0F1419", border: "1px solid #C9A84C22" }}
            >
              <h2
                className="text-xl font-bold mb-5"
                style={{ color: "#C9A84C", fontFamily: "Playfair Display, serif" }}
              >
                Recent Activity
              </h2>
              <div className="space-y-4">
                {data.activity.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <span className="text-lg">{activityIcons[item.type] ?? "•"}</span>
                    <div className="flex-1">
                      <p className="text-sm text-white/80">{item.description}</p>
                      <p className="text-xs text-white/30 mt-0.5">{timeAgo(item.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* DAO Notifications */}
          <Section>
            <div
              className="rounded-2xl p-6"
              style={{ background: "#0F1419", border: "1px solid #C9A84C22" }}
            >
              <h2
                className="text-xl font-bold mb-5"
                style={{ color: "#C9A84C", fontFamily: "Playfair Display, serif" }}
              >
                DAO Notifications
              </h2>
              <div className="space-y-4">
                {data.daoNotifications.length === 0 ? (
                  <p className="text-white/30 text-sm">No active proposals.</p>
                ) : (
                  data.daoNotifications.map((proposal) => (
                    <DAOProposalCard
                      key={proposal.id}
                      proposal={proposal}
                      currentUserVotingPower={100}
                    />
                  ))
                )}
              </div>
            </div>
          </Section>
        </div>

        {/* Yield Vault Widget */}
        <Section>
          <YieldVaultWidget />
        </Section>
      </main>

      {showModal && (
        <FundingApplicationModal
          striverScore={data.striverScore}
          onClose={() => {
            setShowModal(false);
            setSelectedTrack(null);
          }}
        />
      )}
    </div>
  );
}
