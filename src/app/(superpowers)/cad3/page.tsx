import SuperpowerPage from "@/components/SuperpowerPage";
import SectionHeader from "@/components/SectionHeader";
import CtaSection from "@/components/CtaSection";
import { getSuperpowerMetadata } from "@/data/superpowers";
import { innovations } from "@/data/cad3-innovations";
import { typeCategories } from "@/data/cad3-types";
import { getIcon } from "@/lib/icons";

export const metadata = getSuperpowerMetadata("/cad3");

export default function CAD3Data() {
  return (
    <SuperpowerPage href="/cad3" heroContent={
      <>
        <p>
          Data is the foundation of everything in a decentralised network—global
          state, smart contracts, transactions, cryptographic proofs. If the
          encoding is wrong, nothing else matters.
        </p>
        <p>
          Existing formats were never designed for this world. JSON has no
          canonical form. Protocol Buffers need external schemas. XML cannot
          build Merkle trees. None of them give data a stable, verifiable
          identity.
        </p>
        <p>
          CAD3 was built from first principles to solve this: a single, universal
          encoding where every value has exactly one representation, every
          structure is cryptographically verifiable, and the entire lattice—from
          a single integer to petabytes of global state—shares one coherent
          format.
        </p>
      </>
    }>
      {/* Why CAD3 */}
      <section className="vision-section">
        <SectionHeader number="001" title="Beyond Legacy Formats" subtitle="Why the world needed a new encoding" />
        <div className="vision-pillars">
          <article className="vision-pillar">
            <span className="vision-pillar-number">?</span>
            <h3>No Identity</h3>
            <p>JSON, XML, and most formats allow multiple encodings of the same value. Without a canonical form, there is no stable hash—and without a stable hash, there is no content addressing, no Merkle trees, no trustless verification.</p>
          </article>
          <article className="vision-pillar">
            <span className="vision-pillar-number">!</span>
            <h3>No Integrity</h3>
            <p>Legacy formats treat cryptographic verification as someone else&apos;s problem. CAD3 makes it structural: every cell hashes to a Value ID, every tree is a Merkle DAG, and every piece of data carries its own proof of authenticity.</p>
          </article>
          <article className="vision-pillar">
            <span className="vision-pillar-number">∞</span>
            <h3>No Scale</h3>
            <p>Flat formats break when data grows beyond a single message. CAD3 encodes data as trees of bounded cells—a 4GB blob is just six levels deep. Partial synchronisation, streaming, and zero-copy operations come free.</p>
          </article>
        </div>
      </section>

      {/* Core Innovations */}
      <section className="vision-section">
        <SectionHeader number="002" title="Core Innovations" subtitle="Eight design principles that make CAD3 unique" />
        <div className="vision-principles-grid">
          {innovations.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <article key={item.title} className="vision-principle-card">
                <div className="vision-principle-icon"><Icon size={24} strokeWidth={1.5} /></div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Data Types */}
      <section className="vision-section">
        <SectionHeader number="003" title="Universal Data" subtitle="One format for every kind of value" />
        <div className="lattice-innovations-grid">
          {typeCategories.map((cat) => (
            <article key={cat.title} className="lattice-innovation-card">
              <h4>{cat.title}</h4>
              <p>{cat.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Key Properties */}
      <section className="vision-section">
        <SectionHeader number="004" title="Built for the Future" subtitle="Properties that no other format delivers together" />
        <div className="vision-pillars">
          <article className="vision-pillar">
            <span className="vision-pillar-number">∞</span>
            <h3>Infinite Scale</h3>
            <p>Balanced trees of bounded cells represent data of any size. Structural sharing means updates copy only the changed path. The lattice grows without bound while each participant handles only what they need.</p>
          </article>
          <article className="vision-pillar">
            <span className="vision-pillar-number">0</span>
            <h3>Zero Ambiguity</h3>
            <p>One value, one encoding, one hash. Canonical representation eliminates an entire class of security vulnerabilities and makes every piece of data independently verifiable by anyone, anywhere.</p>
          </article>
          <article className="vision-pillar">
            <span className="vision-pillar-number">*</span>
            <h3>Universal Compatibility</h3>
            <p>CAD3 naturally encodes JSON, XML, CSV, S-expressions, binary data, and content-addressable storage. It does not replace these formats—it subsumes them, giving each a canonical, verifiable representation.</p>
          </article>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Explore the stack"
        description="See how CAD3 underpins the lattice, or dive into the full encoding specification."
        links={[
          { label: "Data Lattice", href: "/lattice" },
          { label: "Start Building", href: "/developers", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
