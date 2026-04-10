// Shared TypeScript types for The Corridor Capital

export interface StriverSignal {
  name: "revenue" | "community" | "trajectory" | "repayment" | "operations";
  value: number; // 0–100
  weight: number; // fractional weight summing to 1
}

export interface StriverScore {
  score: number; // 300–850
  tier: "bronze" | "silver" | "gold" | "platinum";
  signals: StriverSignal[];
  unlockedTracks: FundingMode[];
  lastUpdated: string; // ISO date string
}

export type FundingMode =
  | "revenue_advance"
  | "community_loan"
  | "dao_grant"
  | "equity_crowdfund"
  | "invoice_factoring"
  | "micro_grant"
  | "accelerator_bridge"
  | "yield_backed"
  | "peer_lending"
  | "striver_reward";

export interface FundingTrack {
  id: FundingMode;
  label: string;
  description: string;
  minScore: number;
  maxAmount: number;
}

export interface DAOProposal {
  id: string;
  founderId: string;
  founderName: string;
  requestedAmount: number;
  pitch: string;
  yesVotes: number;
  noVotes: number;
  deadline: string; // ISO date string
  status: "active" | "passed" | "rejected";
}

export interface ActivityItem {
  id: string;
  type: "score_update" | "track_unlock" | "vote" | "funding" | "deposit";
  description: string;
  timestamp: string;
}

export interface VaultStats {
  tvl: number;
  apy: number;
  monthlyYieldRedirected: number;
  sparkline: { date: string; value: number }[];
}
