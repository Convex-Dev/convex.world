import Link from "next/link";
import { ArrowUpRight, Shield, Coins, TrendingUp, Zap } from "lucide-react";
import ContentPage from "@/components/ContentPage";
import SectionHeader from "@/components/SectionHeader";
import ConvexLogoAnimated from "@/components/ConvexLogoAnimated";
import ReleaseCurveChart from "@/components/ReleaseCurveChart";
import StructuredData from "@/lib/structured-data";
import { getSuperpowerMetadata } from "@/data/superpower-metadata";

export const metadata = getSuperpowerMetadata("/coin");

export default function Coin() {
  return (
    <ContentPage mainClassName="coin-page">
      <ConvexLogoAnimated />

      <section className="coin-hero">
        <span className="coin-ticker">CVM</span>
        <h1>Convex Coin</h1>
        <p className="coin-tagline">The native utility token powering the world&apos;s most efficient decentralised execution engine</p>
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

      <section className="coin-value-section">
        <div className="coin-value-grid">
          <div className="coin-value-card">
            <div className="coin-value-icon">
              <Zap size={24} strokeWidth={1.5} />
            </div>
            <h3>Transaction Fuel</h3>
            <p>A small CVM fee applies only to state-changing transactions—safeguarding the network while ensuring equitable access.</p>
          </div>
          <div className="coin-value-card">
            <div className="coin-value-icon">
              <Shield size={24} strokeWidth={1.5} />
            </div>
            <h3>Stake & Secure</h3>
            <p>Stake CVM on trusted peers through Convergent Proof-of-Stake, earning rewards while strengthening network security.</p>
          </div>
          <div className="coin-value-card">
            <div className="coin-value-icon">
              <Coins size={24} strokeWidth={1.5} />
            </div>
            <h3>Digital Currency</h3>
            <p>Use CVM as a convenient, self-sovereign digital currency for value exchange across the ecosystem.</p>
          </div>
          <div className="coin-value-card">
            <div className="coin-value-icon">
              <TrendingUp size={24} strokeWidth={1.5} />
            </div>
            <h3>Earn Rewards</h3>
            <p>Contributors to the network and ecosystem are rewarded with CVM for their participation.</p>
          </div>
        </div>
      </section>

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

      <section className="coin-tokenomics">
        <SectionHeader number="001" title="Tokenomics" subtitle="Fair distribution governed by the non-profit Convex Foundation" />
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

      <section className="coin-curve-section">
        <SectionHeader number="002" title="Release Curve" subtitle="Dynamic pricing that grows with adoption" />
        <div className="coin-curve-content">
          <div className="coin-curve-formula">
            <div className="coin-formula-box">
              <code>price = c × x / (1 - x)</code>
              <div className="coin-formula-legend">
                <span><strong>c</strong> = $100 base price</span>
                <span><strong>x</strong> = proportion already sold</span>
              </div>
            </div>
            <p>The supply of CVM converges towards a theoretical hard cap of 1,000,000,000 CVM. The rate of convergence is determined by the economics of the release curve.</p>
          </div>
          <div className="coin-curve-chart">
            <ReleaseCurveChart />
          </div>
        </div>
      </section>

      <section className="coin-cta">
        <h3>Ready to participate?</h3>
        <p>Join the Convex ecosystem and be part of the future of decentralised systems.</p>
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
      <StructuredData type="WebPage" metadata={metadata} path="/coin/" />
    </ContentPage>
  );
}
