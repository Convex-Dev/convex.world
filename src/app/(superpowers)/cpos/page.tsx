import SuperpowerPage from "@/components/SuperpowerPage";
import SectionHeader from "@/components/SectionHeader";
import CtaSection from "@/components/CtaSection";
import CposHexAnimation from "@/components/CposHexAnimation";
import { getSuperpowerMetadata } from "@/data/superpowers";
import { advantages } from "@/data/cpos-advantages";
import { howItWorks } from "@/data/cpos-how-it-works";
import { getIcon } from "@/lib/icons";

export const metadata = getSuperpowerMetadata("/cpos");

export default function CPoS() {
  return (
    <SuperpowerPage href="/cpos" visual={<div className="vision-hero-visual"><CposHexAnimation /></div>}>
      {/* How It Works */}
      <section className="vision-section">
        <SectionHeader number="001" title="How CPoS Works" subtitle="Consensus through convergence, not competition" />
        <div className="cpos-explainer">
          {howItWorks.map((step) => {
            const Icon = getIcon(step.icon);
            return (
              <div key={step.title} className="cpos-step">
                <div className="cpos-step-number"><Icon size={20} strokeWidth={1.5} /></div>
                <div className="cpos-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Not a Blockchain */}
      <section className="vision-section">
        <SectionHeader number="002" title="Not a Blockchain" subtitle="A fundamentally different architecture" />
        <div className="cpos-comparison">
          <div className="cpos-comparison-col">
            <h4>Traditional Blockchains</h4>
            <ul>
              <li>Sequential block production by elected leaders</li>
              <li>Each block must reference the previous block hash</li>
              <li>Transactions broadcast to public mempool</li>
              <li>Vulnerable to front-running and MEV extraction</li>
              <li>Block time creates inherent latency floor</li>
              <li>Energy-intensive Proof of Work or complex leader election</li>
            </ul>
          </div>
          <div className="cpos-comparison-col cpos-comparison-convex">
            <h4>Convex CPoS</h4>
            <ul>
              <li>Any peer proposes blocks concurrently, no leader needed</li>
              <li>Blocks are independent—no chain, no sequential dependency</li>
              <li>Transactions submitted to a trusted peer directly</li>
              <li>Front-running resistant by design</li>
              <li>Zero block delay, millisecond finality</li>
              <li>Lightweight CRDT convergence, negligible energy cost</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="vision-section">
        <SectionHeader number="003" title="Advantages" subtitle="What CPoS delivers" />
        <div className="vision-principles-grid">
          {advantages.map((a) => {
            const Icon = getIcon(a.icon);
            return (
              <article key={a.title} className="vision-principle-card">
                <div className="vision-principle-icon"><Icon size={22} strokeWidth={1.5} /></div>
                <h4>{a.title}</h4>
                <p>{a.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Security Guarantees */}
      <section className="vision-section">
        <SectionHeader number="004" title="Security Guarantees" subtitle="Proven stability under adversarial conditions" />
        <div className="vision-pillars">
          <article className="vision-pillar">
            <span className="vision-pillar-number">51%</span>
            <h3>Majority Stability</h3>
            <p>If more than 50% of peers adopt the same ordering and are mutually aware of each other&apos;s agreement, the ordering is provably stable—no matter what adversaries attempt.</p>
          </article>
          <article className="vision-pillar">
            <span className="vision-pillar-number">67%</span>
            <h3>Byzantine Threshold</h3>
            <p>With at least 2/3 of peers aligned and fewer than 1/3 being adversarial, consensus is provably stable against irrelevant alternatives and colluding attackers.</p>
          </article>
          <article className="vision-pillar">
            <span className="vision-pillar-number">75%</span>
            <h3>Adversary Resistance</h3>
            <p>With 75% alignment, consensus holds even against adversaries capable of temporarily isolating peers, censoring messages, or delaying activity of honest participants.</p>
          </article>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Dive deeper"
        description="Explore the full Convex technology stack or start building on the network today."
        links={[
          { label: "Explore the Lattice", href: "/lattice" },
          { label: "Start Building", href: "/developers", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
