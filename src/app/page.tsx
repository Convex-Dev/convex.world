import Link from "next/link";
import CapabilitySections from "@/components/CapabilitySections";

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
          <div className="hero-label">A New Internet of Value</div>
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
      <div className="proof-of-life">
        <div className="pol-item">
          <div className="pol-label">Consensus Height</div>
          <div className="pol-value">14,892,847</div>
        </div>
        <div className="pol-item">
          <div className="pol-label">Active Participants</div>
          <div className="pol-value">2,847</div>
        </div>
        <div className="pol-item">
          <div className="pol-label">Juice Consumed</div>
          <div className="pol-value">847.2M</div>
        </div>
        <div className="pol-item">
          <div className="pol-label">State Convergence</div>
          <div className="pol-value">&lt;500ms</div>
        </div>
      </div>

      {/* Capabilities Journey */}
      <CapabilitySections />

      {/* Geometric separator */}
      <div className="geo-line" aria-hidden="true" />
    </main>
  );
}
