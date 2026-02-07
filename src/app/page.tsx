import CapabilitySections from "@/components/CapabilitySections";
import LiveInspector from "@/components/LiveInspector";
import ResourceGauges from "@/components/ResourceGauges";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HexGridBackground from "@/components/HexGridBackground";
import { ConvexProvider } from "@/contexts/ConvexContext";
import { WalletProvider } from "@/contexts/WalletContext";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <WalletProvider persistKey="convex.world:wallet">
          <ConvexProvider>
            {/* Hexagon Grid Background */}
            <HexGridBackground />

            {/* Hero — Single focused message */}
            <Hero />

            {/* Capabilities Journey */}
            <CapabilitySections />

            {/* Bottom grid background — starts behind bottom capabilities, extends to footer */}
            <div className="home-bottom-grid-wrapper">
              <div className="lattice-bg lattice-bg-home" aria-hidden="true" />

              {/* Live Tools Section — Expressions layer: evidence of capabilities */}
              <section className="inspector-section">
                <div className="section-header">
                  <span className="section-number">// Observe</span>
                  <h2>Inspect Live State</h2>
                  <p>Direct instrumentation into the global consensus</p>
                </div>
                <div className="live-tools-grid">
                  <LiveInspector />
                  <ResourceGauges />
                </div>
              </section>

              {/* Geometric separator */}
              <div className="geo-line" aria-hidden="true" />
            </div>
          </ConvexProvider>
        </WalletProvider>
      </main>
      <Footer />
    </>
  );
}
