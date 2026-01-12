import Link from "next/link";
import CapabilitySections from "@/components/CapabilitySections";
import LiveProofOfLife from "@/components/LiveProofOfLife";
import LiveInspector from "@/components/LiveInspector";
import ResourceGauges from "@/components/ResourceGauges";

export default function Home() {
  return (
    <main>
      {/* Lattice Grid Background */}
      <div className="lattice-bg" aria-hidden="true">
        <div className="lattice-node lattice-node-1" />
        <div className="lattice-node lattice-node-2" />
        <div className="lattice-node lattice-node-3" />
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-eyebrow">
          <span className="hero-label">The Missing Coordination Primitive</span>
        </div>
        
        <h1 className="hero-title">
          <span className="hero-title-line">Deterministic Shared State</span>
          <span className="hero-title-line">for <span className="hero-accent">Humans</span> and <span className="hero-accent">Autonomous Agents</span></span>
        </h1>
        
        <p className="hero-subtitle">
          <span className="hero-subtitle-line">Global finality without blocks.</span>
          <span className="hero-subtitle-line">Convergent consensus at the speed of light.</span>
          <span className="hero-subtitle-emphasis">One economic system. Infinite coordination.</span>
        </p>

        <div className="hero-cta-group">
          <Link href="https://docs.convex.world" className="btn btn-primary btn-lg" target="_blank">
            <span>Explore the Protocol</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link 
            href="https://github.com/Convex-Dev" 
            className="btn btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Source
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Proof of Life Strip — Real-time system status */}
      <LiveProofOfLife />

      {/* Capabilities Journey */}
      <CapabilitySections />

      {/* Live Tools Section */}
      <section className="inspector-section">
        <div className="section-header">
          <span className="section-number">// 004</span>
          <h2>System Observation</h2>
          <p>Live instrumentation into network state</p>
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
