import Link from "next/link";
import { ArrowUpRight, Shield, Coins, TrendingUp, Zap } from "lucide-react";

function ConvexLogoAnimated() {
  return (
    <div className="coin-logo-container">
      {/* Grid lines */}
      <svg className="coin-grid" viewBox="0 0 400 400" aria-hidden="true">
        {/* Horizontal lines */}
        {[...Array(9)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} className="grid-line" />
        ))}
        {/* Vertical lines */}
        {[...Array(9)].map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" className="grid-line" />
        ))}
      </svg>
      
      {/* Animated Convex Logo */}
      <svg className="coin-logo-svg" viewBox="0 0 100 100" aria-hidden="true">
        {/* Outer hexagon */}
        <polygon 
          className="logo-hex" 
          points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" 
          fill="none" 
          strokeWidth="1.5"
        />
        {/* Inner lines forming the lattice pattern */}
        <line className="logo-line logo-line-1" x1="50" y1="5" x2="50" y2="95" />
        <line className="logo-line logo-line-2" x1="50" y1="95" x2="7" y2="27.5" />
        <line className="logo-line logo-line-3" x1="50" y1="95" x2="93" y2="27.5" />
        
        {/* Energy pulse circles */}
        <circle className="energy-pulse pulse-1" cx="50" cy="50" r="20" />
        <circle className="energy-pulse pulse-2" cx="50" cy="50" r="35" />
        <circle className="energy-pulse pulse-3" cx="50" cy="50" r="50" />
      </svg>
      
      {/* Glow effect */}
      <div className="coin-glow" />
    </div>
  );
}

export default function Coin() {
  return (
    <main className="coin-page">
      {/* Animated Logo Background */}
      <ConvexLogoAnimated />

      {/* Hero Section - Centered, impactful */}
      <section className="coin-hero">
        <span className="coin-ticker">CVM</span>
        <h1>Convex Coin</h1>
        <p className="coin-tagline">
          The native utility token powering the world&apos;s most efficient 
          decentralized execution engine
        </p>
        <div className="coin-hero-stats">
          <div className="coin-hero-stat">
            <span className="coin-hero-stat-value">1B</span>
            <span className="coin-hero-stat-label">Max Supply</span>
          </div>
          <div className="coin-hero-stat-divider" />
          <div className="coin-hero-stat">
            <span className="coin-hero-stat-value">10<sup>9</sup></span>
            <span className="coin-hero-stat-label">Coppers per Coin</span>
          </div>
          <div className="coin-hero-stat-divider" />
          <div className="coin-hero-stat">
            <span className="coin-hero-stat-value">0</span>
            <span className="coin-hero-stat-label">Read Fees</span>
          </div>
        </div>
        <div className="btn-group">
          <Link href="https://app.paisley.io" className="btn btn-primary" target="_blank">
            Buy CVM
            <ArrowUpRight size={16} />
          </Link>
          <Link href="https://docs.convex.world/docs/cad/tokenomics" className="btn btn-secondary" target="_blank">
            Tokenomics
          </Link>
        </div>
      </section>

      {/* Value Props - Horizontal cards */}
      <section className="coin-value-section">
        <div className="coin-value-grid">
          <div className="coin-value-card">
            <div className="coin-value-icon">
              <Zap size={24} strokeWidth={1.5} />
            </div>
            <h3>Transaction Fuel</h3>
            <p>
              A small CVM fee applies only to state-changing transactions—safeguarding 
              the network while ensuring equitable access.
            </p>
          </div>
          <div className="coin-value-card">
            <div className="coin-value-icon">
              <Shield size={24} strokeWidth={1.5} />
            </div>
            <h3>Stake & Secure</h3>
            <p>
              Stake CVM on trusted peers through Convergent Proof-of-Stake, 
              earning rewards while strengthening network security.
            </p>
          </div>
          <div className="coin-value-card">
            <div className="coin-value-icon">
              <Coins size={24} strokeWidth={1.5} />
            </div>
            <h3>Digital Currency</h3>
            <p>
              Use CVM as a convenient, self-sovereign digital currency 
              for value exchange across the ecosystem.
            </p>
          </div>
          <div className="coin-value-card">
            <div className="coin-value-icon">
              <TrendingUp size={24} strokeWidth={1.5} />
            </div>
            <h3>Earn Rewards</h3>
            <p>
              Contributors to the network and ecosystem are rewarded 
              with CVM for their participation.
            </p>
          </div>
        </div>
      </section>

      {/* Free Access Banner */}
      <section className="coin-free-banner">
        <div className="coin-free-content">
          <h2>Most Interactions Are <span>Free</span></h2>
          <div className="coin-free-items">
            <div className="coin-free-item">
              <span className="coin-free-check">✓</span>
              <div>
                <strong>Agentic Tools</strong>
                <p>Use agentic tools via MCP</p>
              </div>
            </div>
            <div className="coin-free-item">
              <span className="coin-free-check">✓</span>
              <div>
                <strong>Unlimited Reads</strong>
                <p>Query the global state at no cost</p>
              </div>
            </div>
            <div className="coin-free-item">
              <span className="coin-free-check">✓</span>
              <div>
                <strong>Off-chain Flexibility</strong>
                <p>Lattice Technology for everyone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="coin-tokenomics">
        <div className="section-header">
          <span className="section-number">// 001</span>
          <h2>Tokenomics</h2>
          <p>Fair distribution governed by the non-profit Convex Foundation</p>
        </div>

        <div className="coin-allocation">
          <div className="coin-allocation-visual">
            <div className="coin-allocation-ring">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="ring-bg" />
                <circle cx="50" cy="50" r="45" className="ring-25" strokeDasharray="70.68 212.06" strokeDashoffset="53" />
                <circle cx="50" cy="50" r="45" className="ring-75" strokeDasharray="212.06 70.68" strokeDashoffset="-17.67" />
              </svg>
              <div className="coin-allocation-center">
                <span>1B</span>
                <small>Max Supply</small>
              </div>
            </div>
          </div>
          <div className="coin-allocation-details">
            <div className="coin-allocation-item">
              <div className="coin-allocation-bar bar-25" />
              <div className="coin-allocation-info">
                <span className="coin-allocation-percent">25%</span>
                <h4>Development & Grants</h4>
                <p>Bounties and awards to accelerate core development, tooling, and dapp innovation.</p>
              </div>
            </div>
            <div className="coin-allocation-item">
              <div className="coin-allocation-bar bar-75" />
              <div className="coin-allocation-info">
                <span className="coin-allocation-percent">75%</span>
                <h4>Public Release Curve</h4>
                <p>Fair, transparent release over time—ensuring broad participation and aligned incentives.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Release Curve */}
      <section className="coin-curve-section">
        <div className="section-header">
          <span className="section-number">// 002</span>
          <h2>Release Curve</h2>
          <p>Dynamic pricing that grows with adoption</p>
        </div>

        <div className="coin-curve-content">
          <div className="coin-curve-formula">
            <div className="coin-formula-box">
              <code>price = c × x / (1 - x)</code>
              <div className="coin-formula-legend">
                <span><strong>c</strong> = $100 base price</span>
                <span><strong>x</strong> = proportion already sold</span>
              </div>
            </div>
            <p>
              The supply of CVM converges towards a theoretical hard cap of 
              1,000,000,000 CVM. The rate of convergence is determined by 
              the economics of the release curve.
            </p>
          </div>
          <div className="coin-curve-chart">
            <svg viewBox="0 0 400 280" className="release-curve-svg">
              {/* Grid lines */}
              <defs>
                <linearGradient id="curveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Horizontal grid lines */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line key={`h${i}`} x1="50" y1={40 + i * 40} x2="380" y2={40 + i * 40} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              ))}
              
              {/* Vertical grid lines */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <line key={`v${i}`} x1={50 + i * 33} y1="40" x2={50 + i * 33} y2="240" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              ))}
              
              {/* Axes */}
              <line x1="50" y1="240" x2="380" y2="240" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="50" y1="40" x2="50" y2="240" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              
              {/* Area under curve - smooth bezier following price = 100 * x / (1-x) */}
              <path
                d="M50,240 C100,238 150,232 182,222 C214,212 240,195 260,175 C280,155 300,120 314,75 C320,55 325,40 325,40 L325,240 Z"
                fill="url(#areaGradient)"
              />
              
              {/* Curve - smooth bezier curve ending at ~83% where price = $500 */}
              <path
                d="M50,240 C100,238 150,232 182,222 C214,212 240,195 260,175 C280,155 300,120 314,75 C320,55 325,40 325,40"
                fill="none"
                stroke="url(#curveGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              
              {/* Y-axis labels */}
              <text x="45" y="44" textAnchor="end" className="chart-label">$500</text>
              <text x="45" y="84" textAnchor="end" className="chart-label">$400</text>
              <text x="45" y="124" textAnchor="end" className="chart-label">$300</text>
              <text x="45" y="164" textAnchor="end" className="chart-label">$200</text>
              <text x="45" y="204" textAnchor="end" className="chart-label">$100</text>
              <text x="45" y="244" textAnchor="end" className="chart-label">$0</text>
              
              {/* X-axis labels */}
              <text x="50" y="258" textAnchor="middle" className="chart-label">0%</text>
              <text x="116" y="258" textAnchor="middle" className="chart-label">20%</text>
              <text x="182" y="258" textAnchor="middle" className="chart-label">40%</text>
              <text x="248" y="258" textAnchor="middle" className="chart-label">60%</text>
              <text x="314" y="258" textAnchor="middle" className="chart-label">80%</text>
              <text x="380" y="258" textAnchor="middle" className="chart-label">100%</text>
              
              {/* Axis titles */}
              <text x="20" y="140" textAnchor="middle" className="chart-axis-title" transform="rotate(-90, 20, 140)">Coin Price</text>
              <text x="215" y="275" textAnchor="middle" className="chart-axis-title">Proportion Released</text>
            </svg>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="coin-cta">
        <h3>Ready to participate?</h3>
        <p>Join the Convex ecosystem and be part of the future of decentralized systems.</p>
        <div className="btn-group">
          <Link href="https://app.paisley.io" className="btn btn-primary" target="_blank">
            Buy CVM
            <ArrowUpRight size={16} />
          </Link>
          <Link href="https://discord.com/invite/xfYGq4CT7v" className="btn btn-secondary" target="_blank">
            Join Community
          </Link>
        </div>
        <div className="coin-cta-links">
          <Link href="https://docs.convex.world/docs/cad/tokenomics" target="_blank">
            CAD020 Tokenomics <ArrowUpRight size={12} />
          </Link>
          <Link href="https://docs.convex.world/docs/overview/convex-whitepaper" target="_blank">
            Whitepaper <ArrowUpRight size={12} />
          </Link>
        </div>
      </section>

      <div className="geo-line" aria-hidden="true" />
    </main>
  );
}

