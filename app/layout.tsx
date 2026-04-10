import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Corridor Capita — Funding the Underestimated",
  description:
    "Corridor Capita is a community-powered funding platform for underestimated founders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col" style={{ background: "#080C12", color: "#fff" }}>
        {children}
      </body>
    </html>
  );
}
