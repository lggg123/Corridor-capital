"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const CorridorScene = dynamic(() => import("@/components/CorridorScene"), {
  ssr: false,
  loading: () => null,
});

const GOLD = "#C9A84C";
const DARK = "#080C12";
const CARD_BG = "#0F1419";
const BORDER = "#C9A84C22";

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Build Your Striver Score",
    body: "Connect your revenue, community, and repayment history. Our proprietary score reflects the full picture of your business — not just your credit.",
  },
  {
    step: "02",
    title: "Unlock Funding Tracks",
    body: "As your score grows, more capital options open up: micro grants, revenue advances, DAO grants, equity crowdfunding, and beyond.",
  },
  {
    step: "03",
    title: "Apply in Minutes",
    body: "No lengthy bank forms. Tell us your story, show us your numbers, and let the Corridor Capita community back your vision.",
  },
  {
    step: "04",
    title: "Grow Together",
    body: "Receive funding, vote on community proposals, and support the next wave of underestimated founders through the DAO.",
  },
];

const FUNDING_TRACKS = [
  { label: "Micro Grant", range: "Up to $5,000", icon: "🌱", desc: "Seed capital for early-stage founders" },
  { label: "Revenue Advance", range: "Up to $50,000", icon: "📈", desc: "Advance against your monthly revenue" },
  { label: "Community Loan", range: "Up to $25,000", icon: "🤝", desc: "Low-interest peer lending" },
  { label: "DAO Grant", range: "Up to $10,000", icon: "🗳️", desc: "Non-dilutive community grant" },
  { label: "Invoice Factoring", range: "Up to $100,000", icon: "🧾", desc: "Advance against outstanding invoices" },
  { label: "Equity Crowdfund", range: "Up to $500,000", icon: "🚀", desc: "Raise from the Corridor community" },
];

const STATS = [
  { value: "$4.2M+", label: "Deployed to Founders" },
  { value: "1,800+", label: "Founders Funded" },
  { value: "92%", label: "Repayment Rate" },
  { value: "38", label: "States Represented" },
];

const TESTIMONIALS = [
  {
    quote: "Corridor Capita saw what my bank wouldn't — a business with real traction and a real community behind it.",
    name: "Amara Johnson",
    title: "Founder, Harvest & Bloom",
    tier: "Gold",
  },
  {
    quote: "I unlocked a $25k revenue advance in three days. The Striver Score actually rewards the work I've been putting in.",
    name: "Darius Okafor",
    title: "CEO, GridBridge Tech",
    tier: "Platinum",
  },
  {
    quote: "The DAO community voted YES on my proposal. It wasn't just capital — it was a vote of confidence from 140+ people.",
    name: "Sofia Mendez",
    title: "Founder, Raíces Collective",
    tier: "Gold",
  },
];

export default function Home() {
  return (
    <div style={{ background: DARK, color: "#fff" }}>

      {/* ─── NAV ─────────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "#080C12cc",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <span
          className="text-xl font-bold tracking-tight"
          style={{ color: GOLD, fontFamily: "Playfair Display, serif" }}
        >
          Corridor Capita
        </span>
        <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#funding" className="hover:text-white transition-colors">Funding</a>
          <a href="#community" className="hover:text-white transition-colors">Community</a>
        </div>
        <Link
          href="/dashboard"
          className="px-5 py-2 rounded-xl font-semibold text-sm transition-opacity hover:opacity-80"
          style={{ background: GOLD, color: DARK }}
        >
          Founder Dashboard
        </Link>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        {/* 3D scene — contained to hero */}
        <CorridorScene />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold tracking-[0.3em] uppercase mb-6"
            style={{ color: GOLD }}
          >
            Community-Powered Funding
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Capital for the
            <br />
            <span style={{ color: GOLD }}>Underestimated</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 mb-10 max-w-xl leading-relaxed"
          >
            Build your Striver Score, unlock funding tracks, and grow with a
            community that actually has your back.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-opacity hover:opacity-85"
              style={{ background: GOLD, color: DARK }}
            >
              Get Started Free
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-colors hover:border-[#C9A84C]"
              style={{ border: `1px solid #C9A84C44`, color: GOLD }}
            >
              See How It Works
            </a>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-0.5 h-8 rounded-full"
            style={{ background: "#C9A84C44" }}
          />
          <p className="text-xs tracking-widest uppercase" style={{ color: "#C9A84C66" }}>
            Scroll
          </p>
        </div>
      </section>

      {/* ─── STATS BAR ───────────────────────────────────────────────────── */}
      <section style={{ background: CARD_BG, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-4xl font-bold mb-1" style={{ color: GOLD, fontFamily: "Playfair Display, serif" }}>
                {s.value}
              </div>
              <div className="text-sm text-white/50">{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              The Process
            </p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
              How It Works
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.12}>
                <div
                  className="rounded-2xl p-6 h-full"
                  style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
                >
                  <div
                    className="text-5xl font-bold mb-4 opacity-20"
                    style={{ color: GOLD, fontFamily: "Playfair Display, serif" }}
                  >
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-3" style={{ color: GOLD }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STRIVER SCORE EXPLAINER ─────────────────────────────────────── */}
      <section
        style={{ background: CARD_BG, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
        className="py-24 px-6"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Your Score
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
              The Striver Score
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Traditional credit scores ignore the hustle. The Striver Score measures what
              actually matters — your revenue momentum, community standing, repayment history,
              operational consistency, and growth trajectory.
            </p>
            <p className="text-white/60 leading-relaxed">
              As your score climbs, new funding tracks unlock automatically. The harder
              you work, the more capital you can access.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="space-y-5">
              {[
                { label: "Revenue", pct: 78, weight: "25%" },
                { label: "Community", pct: 85, weight: "20%" },
                { label: "Trajectory", pct: 70, weight: "20%" },
                { label: "Repayment", pct: 90, weight: "20%" },
                { label: "Operations", pct: 65, weight: "15%" },
              ].map((sig) => (
                <div key={sig.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">{sig.label}</span>
                    <span style={{ color: GOLD }}>{sig.pct}/100 · {sig.weight}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ background: GOLD }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${sig.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FUNDING TRACKS ──────────────────────────────────────────────── */}
      <section id="funding" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Capital Options
            </p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
              Funding Tracks
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">
              Every founder&apos;s path is different. Unlock tracks as your Striver Score grows — from first grant to equity round.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FUNDING_TRACKS.map((track, i) => (
              <FadeIn key={track.label} delay={i * 0.08}>
                <div
                  className="rounded-2xl p-6 h-full"
                  style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
                >
                  <div className="text-3xl mb-4">{track.icon}</div>
                  <div className="font-semibold text-lg mb-1" style={{ color: GOLD }}>
                    {track.label}
                  </div>
                  <div className="text-xs font-semibold mb-3" style={{ color: "#C9A84C88" }}>
                    {track.range}
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">{track.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DAO / COMMUNITY ─────────────────────────────────────────────── */}
      <section
        id="community"
        style={{ background: CARD_BG, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
        className="py-24 px-6"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn delay={0.1}>
            {/* Mock DAO card */}
            <div
              className="rounded-2xl p-8"
              style={{ background: DARK, border: `1px solid ${BORDER}` }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: GOLD }}>
                  Active Proposal
                </span>
                <span className="text-xs px-3 py-1 rounded-full" style={{ background: "#C9A84C22", color: GOLD }}>
                  5 days left
                </span>
              </div>
              <p className="text-white font-semibold mb-2">Harvest & Bloom — $25,000</p>
              <p className="text-sm text-white/55 mb-6 leading-relaxed">
                Expanding urban farming distribution to 3 new cities with proven unit economics and strong community support.
              </p>
              <div className="mb-4">
                <div className="flex justify-between text-xs text-white/40 mb-1">
                  <span>142 YES</span><span>38 NO</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full" style={{ background: GOLD, width: "79%" }} />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  className="flex-1 py-2 rounded-lg text-sm font-semibold"
                  style={{ background: GOLD, color: DARK }}
                >
                  Vote YES
                </button>
                <button
                  className="flex-1 py-2 rounded-lg text-sm font-semibold"
                  style={{ border: `1px solid #C9A84C44`, color: GOLD }}
                >
                  Vote NO
                </button>
              </div>
            </div>
          </FadeIn>
          <FadeIn>
            <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              The DAO
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
              Community Decides
            </h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Every funding decision is backed by a community vote. DAO members use their
              voting power to surface the best founders — not algorithms or gatekeepers.
            </p>
            <p className="text-white/60 leading-relaxed">
              Participate in governance, earn rewards for backing winners, and help
              shape the future of community-powered capital.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Founder Stories
            </p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
              Built by Believers
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-7 h-full flex flex-col"
                  style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
                >
                  <p className="text-white/75 leading-relaxed mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-white/40 mt-0.5">{t.title}</div>
                    <div
                      className="text-xs font-bold tracking-widest mt-2 uppercase"
                      style={{ color: GOLD }}
                    >
                      {t.tier} Striver
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────── */}
      <section
        style={{ background: CARD_BG, borderTop: `1px solid ${BORDER}` }}
        className="py-28 px-6"
      >
        <FadeIn className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
            Ready?
          </p>
          <h2
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Your Capital is
            <br />
            <span style={{ color: GOLD }}>Waiting</span>
          </h2>
          <p className="text-white/55 mb-10 leading-relaxed">
            Join thousands of underestimated founders who are building their Striver Score
            and unlocking capital on their own terms.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-10 py-5 rounded-xl font-semibold text-lg transition-opacity hover:opacity-85"
            style={{ background: GOLD, color: DARK }}
          >
            Start Building Your Score
          </Link>
        </FadeIn>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────────── */}
      <footer
        className="px-6 py-10"
        style={{ borderTop: `1px solid ${BORDER}` }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="text-xl font-bold"
            style={{ color: GOLD, fontFamily: "Playfair Display, serif" }}
          >
            Corridor Capita
          </span>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/70 transition-colors">Contact</a>
          </div>
          <p className="text-xs text-white/25">© 2026 Corridor Capita. corridorcapita.com</p>
        </div>
      </footer>

    </div>
  );
}
