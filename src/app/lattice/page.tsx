import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SuperpowerPage from "@/components/SuperpowerPage";
import SectionHeader from "@/components/SectionHeader";
import CtaSection from "@/components/CtaSection";
import LatticeDotsGrid from "@/components/LatticeDotsGrid";
import { foundationBlocks } from "@/data/lattice-foundation";
import { regions } from "@/data/lattice-regions";
import { innovations } from "@/data/lattice-innovations";
import { getIcon } from "@/lib/icons";

export default function Lattice() {
  return (
    <SuperpowerPage
      tag="// Core Technology"
      title={<>The Data <span className="hero-accent">Lattice</span></>}
      description="A boundless, self-healing cloud of decentralised data and computing power. Fortified by cryptography and seamless consensus, no single entity controls it."
      visual={<LatticeDotsGrid />}
    >
      {/* Foundation */}
      <section className="vision-section">
        <SectionHeader number="001" title="Algebraic Foundation" subtitle="Mathematics as infrastructure" />
        <div className="lattice-foundation">
          {foundationBlocks.map((b) => {
            const Icon = getIcon(b.icon);
            return (
              <div key={b.title} className="lattice-foundation-block">
                <div className="lattice-foundation-icon"><Icon size={24} strokeWidth={1.5} /></div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Regions */}
      <section className="vision-section">
        <SectionHeader number="002" title="Regions of the Lattice" subtitle="A flexible framework of specialised sub-lattices" />
        <div className="lattice-regions">
          {regions.map((r) => {
            const Icon = getIcon(r.icon);
            return (
              <article key={r.title} className="lattice-region-card">
                <div className="lattice-region-icon"><Icon size={22} strokeWidth={1.5} /></div>
                <div className="lattice-region-content">
                  <h4>{r.title}</h4>
                  <p>{r.text}</p>
                  <Link
                    href={r.link}
                    className="vision-stack-link"
                    target={r.external ? "_blank" : undefined}
                    rel={r.external ? "noopener noreferrer" : undefined}
                  >
                    {r.linkLabel} <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Engineering */}
      <section className="vision-section">
        <SectionHeader number="003" title="Engineering for Scale" subtitle="How we build a global data structure of unlimited size" />
        <div className="lattice-innovations-grid">
          {innovations.map((i) => (
            <article key={i.title} className="lattice-innovation-card">
              <h4>{i.title}</h4>
              <p>{i.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Key Properties */}
      <section className="vision-section">
        <SectionHeader number="004" title="Key Properties" subtitle="What makes the Lattice unique" />
        <div className="vision-pillars">
          <article className="vision-pillar">
            <span className="vision-pillar-number">∞</span>
            <h3>Unlimited Scale</h3>
            <p>Selective attention means nodes only handle what they need. The lattice grows without bound while each participant scales resources independently. No shards, no cross-chain complexity.</p>
          </article>
          <article className="vision-pillar">
            <span className="vision-pillar-number">100%</span>
            <h3>Peer-to-Peer</h3>
            <p>No centralised services. No single source of truth for off-chain data. Users have full control over data storage and sharing. Code is also data—programs and AI models can be stored and executed on the lattice alone.</p>
          </article>
          <article className="vision-pillar">
            <span className="vision-pillar-number">0</span>
            <h3>Zero Coordination</h3>
            <p>The CRDT design guarantees eventual consistency without complex coordination protocols. Simple, occasional gossip between nodes suffices. The lattice self-heals and self-replicates across the network.</p>
          </article>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Explore the Lattice"
        description="Experiment with lattice technology on the live testnet or explore the consensus layer that powers it."
        links={[
          { label: "Explore CPoS", href: "/cpos" },
          { label: "Try the Sandbox", href: "/sandbox", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
