import { NextResponse } from "next/server";
import type { VaultStats } from "@/types";

export async function GET() {
  // In production: fetch from on-chain vault contract + Supabase historical data.
  const sparkline = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86400000).toISOString().slice(0, 10),
    value: parseFloat((7 + Math.sin(i / 4) * 2 + Math.random() * 0.5).toFixed(2)),
  }));

  const stats: VaultStats = {
    tvl: 4_280_000,
    apy: 8.4,
    monthlyYieldRedirected: 32_500,
    sparkline,
  };

  return NextResponse.json(stats);
}
