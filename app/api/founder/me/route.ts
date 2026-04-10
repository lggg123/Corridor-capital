import { NextResponse } from "next/server";
import type { StriverScore, ActivityItem, DAOProposal } from "@/types";

// Mock endpoint — wire up Clerk auth + Supabase in production.
export async function GET() {
  const mockScore: StriverScore = {
    score: 672,
    tier: "gold",
    signals: [
      { name: "revenue", value: 78, weight: 0.25 },
      { name: "community", value: 85, weight: 0.2 },
      { name: "trajectory", value: 70, weight: 0.2 },
      { name: "repayment", value: 90, weight: 0.2 },
      { name: "operations", value: 65, weight: 0.15 },
    ],
    unlockedTracks: [
      "revenue_advance",
      "micro_grant",
      "invoice_factoring",
      "community_loan",
      "peer_lending",
      "dao_grant",
      "yield_backed",
    ],
    lastUpdated: new Date().toISOString(),
  };

  const mockActivity: ActivityItem[] = [
    { id: "1", type: "score_update", description: "Striver Score updated to 672", timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: "2", type: "track_unlock", description: "Yield-Backed Loan track unlocked", timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: "3", type: "vote", description: "DAO voted YES on your proposal", timestamp: new Date(Date.now() - 172800000).toISOString() },
    { id: "4", type: "funding", description: "Revenue advance of $12,000 approved", timestamp: new Date(Date.now() - 259200000).toISOString() },
  ];

  const mockNotifications: DAOProposal[] = [
    {
      id: "prop-1",
      founderId: "founder-1",
      founderName: "Marcus Williams",
      requestedAmount: 25000,
      pitch: "Expanding our urban farming distribution network to 3 new cities. We have proven unit economics and strong community support.",
      yesVotes: 142,
      noVotes: 38,
      deadline: new Date(Date.now() + 5 * 86400000).toISOString(),
      status: "active",
    },
  ];

  return NextResponse.json({
    striverScore: mockScore,
    activity: mockActivity,
    daoNotifications: mockNotifications,
  });
}
