import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseServerClient } from "@/lib/supabase";
import type { StriverSignal, StriverScore, FundingMode } from "@/types";

type SignalRow = {
  signal_name: StriverSignal["name"];
  value: number;
};

const SIGNAL_WEIGHTS: Record<StriverSignal["name"], number> = {
  revenue: 0.25,
  community: 0.2,
  trajectory: 0.2,
  repayment: 0.2,
  operations: 0.15,
};

const TRACK_MIN_SCORES: Record<FundingMode, number> = {
  revenue_advance: 300,
  micro_grant: 300,
  invoice_factoring: 350,
  community_loan: 400,
  peer_lending: 420,
  dao_grant: 500,
  yield_backed: 550,
  equity_crowdfund: 600,
  accelerator_bridge: 650,
  striver_reward: 700,
};

function calcScore(signals: StriverSignal[]): number {
  const weighted = signals.reduce((acc, sig) => {
    const w = SIGNAL_WEIGHTS[sig.name] ?? 0;
    return acc + sig.value * w;
  }, 0);
  // Scale weighted average (0-100) to 300-850
  return Math.round(300 + (weighted / 100) * 550);
}

function determineTier(score: number): StriverScore["tier"] {
  if (score >= 750) return "platinum";
  if (score >= 650) return "gold";
  if (score >= 500) return "silver";
  return "bronze";
}

function getUnlockedTracks(score: number): FundingMode[] {
  return (Object.entries(TRACK_MIN_SCORES) as [FundingMode, number][])
    .filter(([, min]) => score >= min)
    .map(([id]) => id);
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("striver_signals")
    .select("signal_name, value")
    .eq("founder_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (data ?? []) as SignalRow[];

  // Build signal array — default to 0 if missing
  const signals: StriverSignal[] = (
    Object.keys(SIGNAL_WEIGHTS) as StriverSignal["name"][]
  ).map((name) => {
    const row = rows.find((r) => r.signal_name === name);
    return {
      name,
      value: row?.value ?? 0,
      weight: SIGNAL_WEIGHTS[name],
    };
  });

  const score = calcScore(signals);
  const tier = determineTier(score);
  const unlockedTracks = getUnlockedTracks(score);

  const response: StriverScore = {
    score,
    tier,
    signals,
    unlockedTracks,
    lastUpdated: new Date().toISOString(),
  };

  return NextResponse.json(response);
}
