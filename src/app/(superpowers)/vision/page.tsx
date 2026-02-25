import Link from "next/link";
import { ArrowRight, Cpu, Globe2, Zap } from "lucide-react";
import SuperpowerPage from "@/components/SuperpowerPage";
import SectionHeader from "@/components/SectionHeader";
import CtaSection from "@/components/CtaSection";
import VisionNetworkAnimation from "@/components/VisionNetworkAnimation";
import StructuredData from "@/lib/structured-data";
import { principles } from "@/data/vision-principles";
import { getIcon } from "@/lib/icons";

export const metadata = {
  title: "Vision — Convex",
  description: "Building open economies for all. The public, decentralised foundation for real-time exchange of data and value.",
};

export default function Vision() {
  return (
    <>
    <StructuredData type="WebPage" metadata={metadata} path="/vision/" />
    <SuperpowerPage
      tag="// Vision"
      title={<>Building open<br /><span className="hero-accent">economies for all</span></>}
      description="Centralised gatekeepers have dominated our economies for too long, extracting rents, inflating costs, and excluding billions from participation. Convex is the public, decentralised foundation for real-time exchange of data and value."
      highlights={[
        { label: "Superpowers", value: "17" },
        { label: "Open Source", value: "100%" },
        { label: "Non-Profit", value: "✓" },
      ]}
      visual={<div className="vision-hero-visual"><VisionNetworkAnimation /></div>}
    >
      {/* The Why */}
      <section className="vision-section">
        <SectionHeader number="001" title="Why Convex Exists" subtitle="Three convictions that drive everything we build" />
        <div className="vision-pillars">
          <article className="vision-pillar">
            <span className="vision-pillar-number">01</span>
            <h3>Decentralised Economies</h3>
            <p>We want open, inclusive, decentralised economies at global scale—free from centralised control and unnecessary middlemen. This can only occur with true self-sovereign control of data and assets, backed by a powerful open protocol.</p>
          </article>
          <article className="vision-pillar">
            <span className="vision-pillar-number">02</span>
            <h3>Mass Adoption</h3>
            <p>Getting the whole world to use decentralised applications requires realtime, interactive performance, low transaction costs, and simple operation. Existing blockchains are failing to deliver this. Convex is not a blockchain—it offers a fundamentally more compelling path.</p>
          </article>
          <article className="vision-pillar">
            <span className="vision-pillar-number">03</span>
            <h3>Free from Vested Interests</h3>
            <p>Convex is developed on open-source principles and governed by a non-profit foundation. We are not owned or dependent on money from VCs, power brokers, or centralised organisations. 100% of Convex Coins are issued to those who bring value to the ecosystem.</p>
          </article>
        </div>
      </section>

      {/* Principles */}
      <section className="vision-section">
        <SectionHeader number="002" title="Principles" subtitle="The manifesto that guides every decision" />
        <div className="vision-principles-grid">
          {principles.map((p) => {
            const Icon = getIcon(p.icon);
            return (
              <article key={p.title} className="vision-principle-card">
                <div className="vision-principle-icon"><Icon size={24} strokeWidth={1.5} /></div>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* The Stack */}
      <section className="vision-section">
        <SectionHeader number="003" title="The Full Stack" subtitle="A unified architecture, not a patchwork of protocols" />
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
        <SectionHeader number="004" title="Our Story" subtitle="From first principles to a living network" />
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
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Join the movement"
        description="Convex is open-source, governed by a non-profit, and built for public benefit. The future of decentralised economies is being written now."
        links={[
          { label: "Join the Community", href: "/community" },
          { label: "Start Building", href: "/developers", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
    </>
  );
}
