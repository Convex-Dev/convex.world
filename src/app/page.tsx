import Link from "next/link";
import FeatureBoxes from "@/components/FeatureBoxes";

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
          The execution layer for{" "}
          <span className="hero-accent">intelligent economies</span>
        </h1>
        <p>
          Convex unifies compute, data, and value into one deterministic fabric—enabling 
          humans and AI to coordinate, transact, and build autonomous economic systems 
          at global scale.
        </p>
        
        {/* Convex Lisp code snippet */}
        <div className="hero-code">
          <span className="code-snippet">(convex.fungible/mint my-token 1000000)</span>
        </div>

        <div className="btn-group">
          <Link href="https://docs.convex.world/docs/intro" className="btn btn-primary">
            Enter the Lattice
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

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-value">
            1<span className="stat-unit">M+</span>
          </div>
          <div className="stat-label">Transactions / Second</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">
            <span className="stat-unit">&lt;</span>500<span className="stat-unit">ms</span>
          </div>
          <div className="stat-label">Global Finality</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">
            100<span className="stat-unit">%</span>
          </div>
          <div className="stat-label">Green Consensus</div>
        </div>
        <div className="stat-item stat-item-infinity">
          <div className="stat-value">
            <svg className="stat-infinity-svg" viewBox="0 0 24 24" aria-label="Infinity">
              <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-label">Horizontal Scale</div>
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-number">// 001</span>
          <h2>Core Capabilities</h2>
          <p>
            Beyond blockchain. A new architecture for decentralized computation, 
            designed for the age of autonomous agents and intelligent systems.
          </p>
        </div>
        <FeatureBoxes />
      </section>

      {/* Geometric separator */}
      <div className="geo-line" aria-hidden="true" />
    </main>
  );
}
