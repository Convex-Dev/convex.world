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
          <div className="hero-label">The Missing Coordination Primitive</div>
        </div>
        <h1>
          Convex is a deterministic economic system shared by{" "}
          <span className="hero-accent">humans and autonomous agents</span>
        </h1>
        <p>
          Both participate under the same rules, the same physics, and the same finality.
        </p>

        <div className="btn-group">
          <Link href="https://docs.convex.world" className="btn btn-primary" target="_blank">
            Read Documentation
          </Link>
          <Link 
            href="https://github.com/Convex-Dev" 
            className="btn btn-secondary"
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
