import type { Metadata } from "next";
import CapabilitySections from "@/components/CapabilitySections";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HexGridBackground from "@/components/HexGridBackground";
import StructuredData from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Convex — Engine for the Agentic Economy",
  description: "The open, decentralised network for data and value exchange in an agentic world. Sub-second finality, infinite scalability, 100% green consensus.",
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
