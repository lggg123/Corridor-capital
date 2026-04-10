import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { proposalId: string; vote: "yes" | "no" };
  const { proposalId, vote } = body;

  if (!proposalId || !["yes", "no"].includes(vote)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // In production: validate Clerk session, check voting power in Supabase,
  // then record vote and update proposal tallies.
  return NextResponse.json({ success: true, proposalId, vote });
}
