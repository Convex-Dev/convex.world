import type { Metadata } from "next";
import CapabilitySections from "@/components/CapabilitySections";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HexGridBackground from "@/components/HexGridBackground";
import StructuredData from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Convex — Engine for the Agentic Economy",
  description: "Convex is the decentralised lattice platform for agentic economic systems. Sub-second finality, infinite scalability, 100% green consensus. Smart contracts, digital assets, DeFi, and autonomous AI agents — all on one network. Created by Mike Anderson.",
  keywords: [
    "decentralised platform",
    "agentic economy",
    "lattice technology",
    "smart contract platform",
    "blockchain alternative",
    "decentralised consensus",
    "AI agent infrastructure",
    "autonomous agent platform",
    "DeFi platform",
    "digital asset platform",
    "sub-second finality",
    "green consensus",
    "proof of stake",
    "web3 platform",
    "decentralised network",
    "Mike Anderson",
    "Convex Foundation",
  ],
};

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HexGridBackground />
        <Hero />
        <CapabilitySections />
        <div className="geo-line" aria-hidden="true" />
      </main>
      <Footer />
      <StructuredData type="WebSite" metadata={metadata} path="/" />
    </>
  );
}
