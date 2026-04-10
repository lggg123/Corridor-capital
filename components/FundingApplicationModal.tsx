"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FundingTrack, StriverScore } from "@/types";

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

interface Props {
  striverScore: StriverScore;
  onClose: () => void;
}

interface ApplicationState {
  selectedTrack: FundingTrack | null;
  amount: string;
  purpose: string;
  walletAddress: string;
  txHash: string;
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
};

export default function FundingApplicationModal({ striverScore, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [state, setState] = useState<ApplicationState>({
    selectedTrack: null,
    amount: "",
    purpose: "",
    walletAddress: "",
    txHash: "",
  });

  const goNext = () => {
    setDir(1);
    setStep((s) => s + 1);
  };
  const goPrev = () => {
    setDir(-1);
    setStep((s) => s - 1);
  };

  const eligible =
    state.selectedTrack ? striverScore.score >= state.selectedTrack.minScore : false;

  const connectWallet = async () => {
    // Simulate wallet connection
    setState((s) => ({ ...s, walletAddress: "5xKt...9rMw" }));
  };

  const submitApplication = async () => {
    // Simulate on-chain tx
    const fakeTx = "4vZ" + Math.random().toString(36).slice(2, 12).toUpperCase();
    setState((s) => ({ ...s, txHash: fakeTx }));
    goNext();
  };

  const steps = [
    // Step 0: Select Track
    <div key="step0">
      <h2 className="text-2xl font-bold mb-6" style={{ color: "#C9A84C", fontFamily: "Playfair Display, serif" }}>
        Select a Funding Track
      </h2>
      <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
        {ALL_TRACKS.map((track) => {
          const unlocked = striverScore.unlockedTracks.includes(track.id);
          const selected = state.selectedTrack?.id === track.id;
          return (
            <div
              key={track.id}
              onClick={() => unlocked && setState((s) => ({ ...s, selectedTrack: track }))}
              className="rounded-xl p-4 cursor-pointer"
              style={{
                background: selected ? "#C9A84C15" : "#080C12",
                border: `1px solid ${selected ? "#C9A84C" : unlocked ? "#C9A84C33" : "#ffffff15"}`,
                opacity: unlocked ? 1 : 0.4,
              }}
            >
              <div className="font-semibold text-sm" style={{ color: selected ? "#C9A84C" : "#fff" }}>
                {track.label} {!unlocked && "🔒"}
              </div>
              <div className="text-xs text-white/50 mt-1">{track.description}</div>
            </div>
          );
        })}
      </div>
      <button
        onClick={goNext}
        disabled={!state.selectedTrack}
        className="mt-6 w-full py-3 rounded-xl font-semibold disabled:opacity-40"
        style={{ background: "#C9A84C", color: "#080C12" }}
      >
        Continue
      </button>
    </div>,

    // Step 1: Amount + Purpose
    <div key="step1">
      <h2 className="text-2xl font-bold mb-6" style={{ color: "#C9A84C", fontFamily: "Playfair Display, serif" }}>
        Amount &amp; Purpose
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">Funding Amount (USD)</label>
          <input
            type="number"
            value={state.amount}
            onChange={(e) => setState((s) => ({ ...s, amount: e.target.value }))}
            placeholder="e.g. 10000"
            className="w-full rounded-xl px-4 py-3 text-white outline-none"
            style={{ background: "#080C12", border: "1px solid #C9A84C44" }}
            max={state.selectedTrack?.maxAmount}
          />
          {state.selectedTrack && (
            <p className="text-xs text-white/40 mt-1">
              Max: ${state.selectedTrack.maxAmount.toLocaleString()}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-2">Purpose</label>
          <textarea
            value={state.purpose}
            onChange={(e) => setState((s) => ({ ...s, purpose: e.target.value }))}
            placeholder="Describe how you'll use these funds..."
            rows={4}
            className="w-full rounded-xl px-4 py-3 text-white outline-none resize-none"
            style={{ background: "#080C12", border: "1px solid #C9A84C44" }}
          />
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={goPrev} className="flex-1 py-3 rounded-xl border border-white/20 text-white/70">
          Back
        </button>
        <button
          onClick={goNext}
          disabled={!state.amount || !state.purpose}
          className="flex-1 py-3 rounded-xl font-semibold disabled:opacity-40"
          style={{ background: "#C9A84C", color: "#080C12" }}
        >
          Continue
        </button>
      </div>
    </div>,

    // Step 2: Eligibility Check
    <div key="step2">
      <h2 className="text-2xl font-bold mb-6" style={{ color: "#C9A84C", fontFamily: "Playfair Display, serif" }}>
        Eligibility Check
      </h2>
      <div className="rounded-xl p-5 mb-4" style={{ background: "#080C12", border: "1px solid #C9A84C33" }}>
        <div className="flex justify-between mb-3">
          <span className="text-white/60">Your Striver Score</span>
          <span style={{ color: "#C9A84C" }} className="font-bold">{striverScore.score}</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-white/60">Required Score</span>
          <span className="text-white">{state.selectedTrack?.minScore}</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-white/60">Track</span>
          <span className="text-white">{state.selectedTrack?.label}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">Amount</span>
          <span className="text-white">${Number(state.amount).toLocaleString()}</span>
        </div>
      </div>
      <div
        className="rounded-xl p-4 text-center text-lg font-semibold"
        style={{
          background: eligible ? "#C9A84C15" : "#ff444415",
          border: `1px solid ${eligible ? "#C9A84C" : "#ff4444"}`,
          color: eligible ? "#C9A84C" : "#ff6666",
        }}
      >
        {eligible ? "✓ You are eligible!" : "✗ Score too low for this track"}
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={goPrev} className="flex-1 py-3 rounded-xl border border-white/20 text-white/70">
          Back
        </button>
        <button
          onClick={goNext}
          disabled={!eligible}
          className="flex-1 py-3 rounded-xl font-semibold disabled:opacity-40"
          style={{ background: "#C9A84C", color: "#080C12" }}
        >
          Connect Wallet
        </button>
      </div>
    </div>,

    // Step 3: Connect Wallet + Sign
    <div key="step3">
      <h2 className="text-2xl font-bold mb-6" style={{ color: "#C9A84C", fontFamily: "Playfair Display, serif" }}>
        Connect &amp; Sign
      </h2>
      {!state.walletAddress ? (
        <div className="text-center py-8">
          <p className="text-white/60 mb-6">Connect your Solana wallet to sign this application.</p>
          <button
            onClick={connectWallet}
            className="px-8 py-4 rounded-xl font-semibold text-lg"
            style={{ background: "#C9A84C", color: "#080C12" }}
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div>
          <div className="rounded-xl p-4 mb-6" style={{ background: "#080C12", border: "1px solid #C9A84C44" }}>
            <p className="text-white/50 text-sm mb-1">Connected Wallet</p>
            <p className="font-mono" style={{ color: "#C9A84C" }}>{state.walletAddress}</p>
          </div>
          <p className="text-white/60 text-sm mb-6">
            By signing, you agree to the Corridor Capital terms and authorize this application.
          </p>
          <div className="flex gap-3">
            <button onClick={goPrev} className="flex-1 py-3 rounded-xl border border-white/20 text-white/70">
              Back
            </button>
            <button
              onClick={submitApplication}
              className="flex-1 py-3 rounded-xl font-semibold"
              style={{ background: "#C9A84C", color: "#080C12" }}
            >
              Sign &amp; Submit
            </button>
          </div>
        </div>
      )}
    </div>,

    // Step 4: Confirmation
    <div key="step4" className="text-center py-4">
      <div className="text-5xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: "#C9A84C", fontFamily: "Playfair Display, serif" }}>
        Application Submitted!
      </h2>
      <p className="text-white/60 mb-6">Your funding application is now on-chain.</p>
      {state.txHash && (
        <div className="rounded-xl p-4 mb-6" style={{ background: "#080C12", border: "1px solid #C9A84C44" }}>
          <p className="text-white/50 text-sm mb-1">Transaction Hash</p>
          <p className="font-mono text-sm break-all" style={{ color: "#C9A84C" }}>{state.txHash}</p>
        </div>
      )}
      <button
        onClick={onClose}
        className="px-8 py-3 rounded-xl font-semibold"
        style={{ background: "#C9A84C", color: "#080C12" }}
      >
        Close
      </button>
    </div>,
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)" }}
    >
      <div
        className="w-full max-w-lg rounded-2xl p-6 relative overflow-hidden"
        style={{ background: "#0F1419", border: "1px solid #C9A84C33" }}
      >
        {/* Step indicator */}
        <div className="flex gap-2 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full"
              style={{ background: i <= step ? "#C9A84C" : "#ffffff20" }}
            />
          ))}
        </div>

        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>

        {/* Close button */}
        {step < 4 && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white/80 text-xl"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
