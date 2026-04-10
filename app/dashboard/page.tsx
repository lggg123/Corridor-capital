"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import StriverScoreComponent from "@/components/StriverScore";
import FundingTrackGrid from "@/components/FundingTrackGrid";
import FundingApplicationModal from "@/components/FundingApplicationModal";
import DAOProposalCard from "@/components/DAOProposalCard";
import YieldVaultWidget from "@/components/YieldVaultWidget";
import type { StriverScore, ActivityItem, DAOProposal, FundingTrack } from "@/types";

const GOLD = "#C9A84C";
const DARK = "#080C12";
const CARD_BG = "#0F1419";
const BORDER = "#C9A84C22";

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
      initial={{ opacity: 0, y: 28 }}
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

const tierGradient: Record<string, string> = {
  bronze: "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)",
  silver: "linear-gradient(135deg, #C0C0C0 0%, #808080 100%)",
  gold: "linear-gradient(135deg, #C9A84C 0%, #8B6914 100%)",
  platinum: "linear-gradient(135deg, #E5E4E2 0%, #A0A0A0 100%)",
};

export default function DashboardPage() {
  const [data, setData] = useState<FounderData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<FundingTrack | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "funding" | "dao" | "vault">("overview");

  useEffect(() => {
    fetch("/api/founder/me")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: DARK }}>
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: GOLD, borderTopColor: "transparent" }}
          />
          <p className="text-white/40 text-sm">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  const { score, tier } = data.striverScore;

  return (
    <div className="min-h-screen" style={{ background: DARK }}>

      {/* ─── TOP NAV ─────────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-4"
        style={{
          background: "#080C12ee",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
            style={{ color: GOLD, fontFamily: "Playfair Display, serif" }}
          >
            Corridor Capita
          </Link>
          {/* Tab navigation */}
          <div className="hidden md:flex items-center gap-1">
            {(["overview", "funding", "dao", "vault"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all"
                style={{
                  background: activeTab === tab ? "#C9A84C15" : "transparent",
                  color: activeTab === tab ? GOLD : "#ffffff60",
                  border: activeTab === tab ? `1px solid ${BORDER}` : "1px solid transparent",
                }}
              >
                {tab === "dao" ? "DAO" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Score badge */}
          <div
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ background: "#C9A84C15", border: `1px solid ${BORDER}` }}
          >
            <span className="text-xs text-white/50">Score</span>
            <span className="font-bold text-sm" style={{ color: GOLD }}>{score}</span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize"
              style={{ background: tierGradient[tier] || tierGradient.gold, color: DARK }}
            >
              {tier}
            </span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2 rounded-xl font-semibold text-sm transition-opacity hover:opacity-85"
            style={{ background: GOLD, color: DARK }}
          >
            Apply for Funding
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* ─── WELCOME BANNER ─────────────────────────────────────────── */}
        <Section className="mb-8">
          <div
            className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{
              background: "linear-gradient(135deg, #0F1419 0%, #1a1408 100%)",
              border: `1px solid ${BORDER}`,
            }}
          >
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: GOLD }}>
                Founder Dashboard
              </p>
              <h1
                className="text-3xl font-bold"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Welcome back
              </h1>
              <p className="text-white/50 mt-1 text-sm">
                {data.striverScore.unlockedTracks.length} funding tracks unlocked · Last updated {timeAgo(data.striverScore.lastUpdated)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-5xl font-bold" style={{ color: GOLD, fontFamily: "Playfair Display, serif" }}>
                  {score}
                </div>
                <div
                  className="text-sm font-semibold capitalize mt-0.5"
                  style={{ color: GOLD }}
                >
                  {tier} Striver
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── OVERVIEW TAB ─────────────────────────────────────────────── */}
        {(activeTab === "overview" || true) && (
          <>
            {/* Quick Stats */}
            <Section className="mb-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Striver Score", value: String(score), sub: `${tier} tier`, color: GOLD },
                  { label: "Tracks Unlocked", value: String(data.striverScore.unlockedTracks.length), sub: "of 10 total", color: "#4CAF50" },
                  { label: "DAO Proposals", value: String(data.daoNotifications.length), sub: "active now", color: "#7C6FCD" },
                  { label: "Recent Activity", value: String(data.activity.length), sub: "past 7 days", color: "#4ABFCC" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl p-5"
                    style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
                  >
                    <p className="text-xs text-white/40 mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold mb-0.5" style={{ color: stat.color, fontFamily: "Playfair Display, serif" }}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-white/35">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Striver Score + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Section className="lg:col-span-2">
                <StriverScoreComponent data={data.striverScore} />
              </Section>

              <Section>
                <div
                  className="rounded-2xl p-6 h-full"
                  style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
                >
                  <h2
                    className="text-xl font-bold mb-5"
                    style={{ color: GOLD, fontFamily: "Playfair Display, serif" }}
                  >
                    Recent Activity
                  </h2>
                  <div className="space-y-4">
                    {data.activity.map((item) => (
                      <div key={item.id} className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                          style={{ background: "#C9A84C12" }}
                        >
                          {activityIcons[item.type] ?? "•"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/80 leading-snug">{item.description}</p>
                          <p className="text-xs text-white/30 mt-0.5">{timeAgo(item.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Section>
            </div>

            {/* Funding Tracks */}
            <Section className="mb-8">
              <div
                className="rounded-2xl p-6"
                style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
              >
                <FundingTrackGrid
                  unlockedTracks={data.striverScore.unlockedTracks}
                  onSelectTrack={(track) => {
                    setSelectedTrack(track);
                    setShowModal(true);
                  }}
                />
              </div>
            </Section>

            {/* DAO + Vault */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Section>
                <div
                  className="rounded-2xl p-6 h-full"
                  style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
                >
                  <h2
                    className="text-xl font-bold mb-5"
                    style={{ color: GOLD, fontFamily: "Playfair Display, serif" }}
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

              <Section>
                <YieldVaultWidget />
              </Section>
            </div>
          </>
        )}

      </main>

      {/* ─── MODAL ────────────────────────────────────────────────────────── */}
      {showModal && (
        <FundingApplicationModal
          striverScore={data.striverScore}
          onClose={() => {
            setShowModal(false);
            setSelectedTrack(null);
          }}
        />
      )}

      {/* suppress unused warning */}
      {selectedTrack && null}
    </div>
  );
}
