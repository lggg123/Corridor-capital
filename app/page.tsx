import CorridorSceneClient from "@/components/CorridorSceneClient";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      style={{ background: "#080C12" }}
    >
      {/* Full-bleed 3D scene behind content */}
      <CorridorSceneClient />

      {/* Hero text */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        <p
          className="text-sm font-semibold tracking-[0.3em] uppercase mb-6"
          style={{ color: "#C9A84C" }}
        >
          Community-Powered Funding
        </p>
        <h1
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            color: "#fff",
          }}
        >
          The Corridor
          <br />
          <span style={{ color: "#C9A84C" }}>Capital</span>
        </h1>
        <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl leading-relaxed">
          Funding the underestimated. Build your Striver Score, unlock capital
          tracks, and grow with the community behind you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/app/dashboard"
            className="px-8 py-4 rounded-xl font-semibold text-lg"
            style={{ background: "#C9A84C", color: "#080C12" }}
          >
            Founder Dashboard
          </Link>
          <a
            href="#learn-more"
            className="px-8 py-4 rounded-xl font-semibold text-lg"
            style={{ border: "1px solid #C9A84C44", color: "#C9A84C" }}
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-0.5 h-8 rounded-full" style={{ background: "#C9A84C44" }} />
        <p className="text-xs tracking-widest uppercase" style={{ color: "#C9A84C66" }}>
          Scroll
        </p>
      </div>
    </main>
  );
}

