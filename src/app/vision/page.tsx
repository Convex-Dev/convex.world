import Link from "next/link";
import { ArrowRight, Shield, Zap, Globe2, Users, Leaf, Scale, Eye, Cpu, Coins } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VisionNetworkAnimation from "@/components/VisionNetworkAnimation";

const principles = [
  {
    icon: <Globe2 size={24} strokeWidth={1.5} />,
    title: "Open Economic Systems",
    text: "Voluntary exchange is the engine of human prosperity. Convex facilitates open systems where participants freely create mutual value—without coercion, gatekeepers, or centralised control.",
  },
  {
    icon: <Shield size={24} strokeWidth={1.5} />,
    title: "Self Sovereignty",
    text: "Participation in the digital economy is a human right. No one should be censored, excluded, or forced to pay tribute. Convex returns control over data, assets, and identity to the individual.",
  },
  {
    icon: <Leaf size={24} strokeWidth={1.5} />,
    title: "Sustainability",
    text: "Economic systems must fuel human progress without plundering the Earth. Convex rejects energy-hungry consensus, embracing Convergent Proof of Stake—fast, secure, and ecologically defensible.",
  },
  {
    icon: <Users size={24} strokeWidth={1.5} />,
    title: "Fair Access",
    text: "Billions remain locked out of global markets. Convex tears down those walls. Anyone with an internet connection joins on equal footing—self-sovereign, first-class, and permissionless.",
  },
  {
    icon: <Zap size={24} strokeWidth={1.5} />,
    title: "Real-time Transactions",
    text: "Users demand seamless experiences. CPoS is leaderless, slashing latency to milliseconds. Zero block delay. No mempool. No front-running. Atomicity is ironclad.",
  },
  {
    icon: <Eye size={24} strokeWidth={1.5} />,
    title: "Transparency",
    text: "Open economic systems thrive on transparency. Data in the global state is available to all—enabling better decisions, independent audits, and accountability at every layer.",
  },
  {
    icon: <Scale size={24} strokeWidth={1.5} />,
    title: "Good Governance",
    text: "Governed by the non-profit Convex Foundation. No VC dumps. No pre-mines. Decentralised governance is the destination—on-chain, credentialed, and attack-resistant.",
  },
  {
    icon: <Coins size={24} strokeWidth={1.5} />,
    title: "Cost Effectiveness",
    text: "Transaction costs should be negligible—enough to fairly compensate infrastructure, never enough to exclude. Scalable efficiency means low cost passed directly to users.",
  },
];

export default function Vision() {
  return (
    <>
      <Navigation />
      <main>
        <div className="lattice-bg" aria-hidden="true" />

        {/* Hero */}
        <section className="vision-hero">
          <div className="vision-hero-content">
            <span className="dev-hero-tag">// Vision</span>
            <h1>Building open<br /><span className="hero-accent">economies for all</span></h1>
            <p className="vision-hero-text">
              Centralised gatekeepers have dominated our economies for too long, extracting rents, inflating costs, and excluding billions from participation. Convex is the public, decentralised foundation for real-time exchange of data and value.
            </p>
          </div>
          <div className="vision-hero-visual">
            <VisionNetworkAnimation />
          </div>
        </section>

        {/* The Why */}
        <section className="vision-section">
          <div className="section-header">
            <span className="section-number">// 001</span>
            <h2>Why Convex Exists</h2>
            <p>Three convictions that drive everything we build</p>
          </div>

          <div className="vision-pillars">
            <article className="vision-pillar">
              <span className="vision-pillar-number">01</span>
              <h3>Decentralised Economies</h3>
              <p>
                We want open, inclusive, decentralised economies at global scale—free from centralised control and unnecessary middlemen. This can only occur with true self-sovereign control of data and assets, backed by a powerful open protocol.
              </p>
            </article>
            <article className="vision-pillar">
              <span className="vision-pillar-number">02</span>
              <h3>Mass Adoption</h3>
              <p>
                Getting the whole world to use decentralised applications requires realtime, interactive performance, low transaction costs, and simple operation. Existing blockchains are failing to deliver this. Convex is not a blockchain—it offers a fundamentally more compelling path.
              </p>
            </article>
            <article className="vision-pillar">
              <span className="vision-pillar-number">03</span>
              <h3>Free from Vested Interests</h3>
              <p>
                Convex is developed on open-source principles and governed by a non-profit foundation. We are not owned or dependent on money from VCs, power brokers, or centralised organisations. 100% of Convex Coins are issued to those who bring value to the ecosystem.
              </p>
            </article>
          </div>
        </section>

        {/* Principles */}
        <section className="vision-section">
          <div className="section-header">
            <span className="section-number">// 002</span>
            <h2>Principles</h2>
            <p>The manifesto that guides every decision</p>
          </div>

          <div className="vision-principles-grid">
            {principles.map((p) => (
              <article key={p.title} className="vision-principle-card">
                <div className="vision-principle-icon">{p.icon}</div>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* The Stack */}
        <section className="vision-section">
          <div className="section-header">
            <span className="section-number">// 003</span>
            <h2>The Full Stack</h2>
            <p>A unified architecture, not a patchwork of protocols</p>
          </div>

          <div className="vision-stack">
            <div className="vision-stack-layer">
              <div className="vision-stack-label">
                <Cpu size={18} strokeWidth={1.5} />
                <span>Consensus</span>
              </div>
              <h4>Convergent Proof of Stake</h4>
              <p>A leaderless, Byzantine fault-tolerant consensus algorithm that achieves finality in milliseconds. No chains, no blocks to mine, no energy waste. The network converges to truth through elegant mathematics.</p>
              <Link href="/cpos" className="vision-stack-link">
                Explore CPoS <ArrowRight size={14} />
              </Link>
            </div>
            <div className="vision-stack-layer">
              <div className="vision-stack-label">
                <Globe2 size={18} strokeWidth={1.5} />
                <span>Data</span>
              </div>
              <h4>The Lattice</h4>
              <p>A boundless, self-healing cloud of decentralised data and computing power. Content-addressable, cryptographically verified, infinitely scalable. The global data fabric that makes everything else possible.</p>
              <Link href="/lattice" className="vision-stack-link">
                Explore Lattice <ArrowRight size={14} />
              </Link>
            </div>
            <div className="vision-stack-layer">
              <div className="vision-stack-label">
                <Zap size={18} strokeWidth={1.5} />
                <span>Execution</span>
              </div>
              <h4>Convex Virtual Machine</h4>
              <p>A deterministic runtime built on the lambda calculus. Turing-complete smart contracts, on-chain compilation, and the full power of functional programming—designed for both humans and autonomous agents.</p>
              <Link href="/developers" className="vision-stack-link">
                Start Building <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* The Story */}
        <section className="vision-section">
          <div className="section-header">
            <span className="section-number">// 004</span>
            <h2>Our Story</h2>
            <p>From first principles to a living network</p>
          </div>

          <div className="vision-story">
            <p>
              Convex was created by Mike Anderson, a technology veteran who started coding at age eight and represented the UK in the International Olympiad in Informatics. During a decade at McKinsey &amp; Company, he witnessed the inefficiencies of centralised organisations and knew there had to be a better way to organise our economies.
            </p>
            <p>
              While working as founding CTO at Ocean Protocol, he saw the promise of decentralised systems but also the need for a fundamentally better base layer. This led to a programme of deep research, tackling multiple design challenges to make Convex possible—from inventing Convergent Proof of Stake, to developing Lattice technology, to building a new kind of virtual machine based on the lambda calculus.
            </p>
            <p>
              The Convex Foundation was established in 2020. After years of brutal testing across global testnet deployments—including validation through the EU Next Generation Internet initiative—Convex proved its global scale and stunning energy efficiency. The network is now launching Protonet: the first live Convex network with real assets.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="vision-cta">
          <h2>Join the movement</h2>
          <p>Convex is open-source, governed by a non-profit, and built for public benefit. The future of decentralised economies is being written now.</p>
          <div className="btn-group">
            <Link href="/community" className="btn btn-primary">
              Join the Community
            </Link>
            <Link href="/developers" className="btn btn-secondary">
              Start Building
            </Link>
          </div>
        </section>

        <div className="geo-line" aria-hidden="true" />
      </main>
      <Footer />
    </>
  );
}
