import CapabilitySections from "@/components/CapabilitySections";
import LiveProofOfLife from "@/components/LiveProofOfLife";
import LiveInspector from "@/components/LiveInspector";
import ResourceGauges from "@/components/ResourceGauges";
import RotatingHero from "@/components/RotatingHero";

export default function Home() {
  return (
    <main>
      {/* Lattice Grid Background */}
      <div className="lattice-bg" aria-hidden="true" />

      {/* Rotating Hero Section — 3 key value propositions */}
      <RotatingHero />

      {/* Proof of Life Strip — Real-time system status */}
      <LiveProofOfLife />

      {/* Capabilities Journey */}
      <CapabilitySections />

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
    </main>
  );
}
