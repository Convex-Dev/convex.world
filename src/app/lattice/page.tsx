import Link from "next/link";
import { ArrowRight, Database, HardDrive, Cpu, GitMerge, Shield, Layers, FileCode, Network } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LatticeDotsGrid from "@/components/LatticeDotsGrid";

const regions = [
  {
    icon: <Shield size={22} strokeWidth={1.5} />,
    title: "Consensus Lattice",
    text: "Drives a secure, decentralised global state machine using CPoS. Lattice values are Beliefs, shared by peers and merged to achieve Byzantine fault-tolerant consensus. Smart contracts, digital assets, and autonomous actors all operate within this region.",
    link: "/cpos",
    linkLabel: "Explore CPoS",
  },
  {
    icon: <Database size={22} strokeWidth={1.5} />,
    title: "Data Lattice",
    text: "A decentralised storage network for content-addressable data, owned and managed by its users. Store, read, acquire, and pin arbitrary data. A faster, more efficient evolution of IPFS, built on the Lattice's high-performance architecture.",
    link: "https://docs.convex.world/docs/overview/lattice",
    linkLabel: "Read Docs",
    external: true,
  },
  {
    icon: <HardDrive size={22} strokeWidth={1.5} />,
    title: "DLFS",
    text: "The Data Lattice File System extends the Data Lattice into a self-sovereign, replicated file system. Snapshot entire drives with a single hash. Structural sharing means only deltas are stored—Dropbox meets BitTorrent meets IPFS.",
    link: "https://docs.convex.world/docs/overview/lattice",
    linkLabel: "Read Docs",
    external: true,
  },
  {
    icon: <Cpu size={22} strokeWidth={1.5} />,
    title: "Execution Lattice",
    text: "Specifies compute tasks to be performed on a decentralised basis. Job records define specifications, inputs, outputs, and authorisation. Supports private enclaves, encrypted data, and specialised compute infrastructure.",
    link: "https://docs.convex.world/docs/overview/lattice",
    linkLabel: "Read Docs",
    external: true,
  },
  {
    icon: <Network size={22} strokeWidth={1.5} />,
    title: "P2P Lattice",
    text: "Powers peer-to-peer communication by solving the challenge of locating participants in a decentralised network. Operates like Kademlia—peers store metadata only for nearby peers in cryptographic space, making it highly efficient and fault-tolerant.",
    link: "https://docs.convex.world/docs/overview/lattice",
    linkLabel: "Read Docs",
    external: true,
  },
];

const innovations = [
  {
    title: "Structural Sharing",
    text: "Immutable persistent data structures mean changes produce new values that share most data with the original. Storage and processing are proportional only to changes, not total size.",
  },
  {
    title: "Delta Transmission",
    text: "Only deltas are transmitted when new lattice values are communicated. Network requirements are proportional only to changes—not the total data in the system.",
  },
  {
    title: "Merge Coalescing",
    text: "Multiple received values are merged into a single outgoing value. This automatically reduces traffic and scales load to what each node can individually handle.",
  },
  {
    title: "Selective Attention",
    text: "Nodes select whichever subsets of the lattice they need. Peer operators can scale resource usage based on their own requirements, participating only in relevant regions.",
  },
  {
    title: "Orthogonal Persistence",
    text: "Lattice values exist seamlessly in memory or on disk. From a developer perspective, they are identical. Values are efficiently loaded and cached on demand—an in-memory database that can exceed local RAM.",
  },
  {
    title: "Fast Comparison",
    text: "Checking identity of any two values is a single hash comparison: O(1). Computing the common prefix of two vectors of arbitrary length is also O(1)—heavily exploited for CPoS efficiency.",
  },
];

export default function Lattice() {
  return (
    <>
      <Navigation />
      <main>
        <div className="lattice-bg" aria-hidden="true" />

        {/* Hero */}
        <section className="vision-hero">
          <div className="vision-hero-content">
            <span className="dev-hero-tag">// Core Technology</span>
            <h1>The Data <span className="hero-accent">Lattice</span></h1>
            <p className="vision-hero-text">
              A boundless, self-healing cloud of decentralised data and computing power. Fortified by cryptography and seamless consensus, no single entity controls it.
            </p>
          </div>
          <LatticeDotsGrid />
        </section>

        {/* Foundation */}
        <section className="vision-section">
          <div className="section-header">
            <span className="section-number">// 001</span>
            <h2>Algebraic Foundation</h2>
            <p>Mathematics as infrastructure</p>
          </div>

          <div className="lattice-foundation">
            <div className="lattice-foundation-block">
              <div className="lattice-foundation-icon">
                <GitMerge size={24} strokeWidth={1.5} />
              </div>
              <h3>The Merge Function</h3>
              <p>
                At its core, the Lattice draws from the mathematical concept of a lattice—a partially ordered set equipped with a merge function. This function combines any two lattice values into a single, consistent result. Through repeated merges, the system naturally converges to a unified value without complex locking mechanisms or heavy consensus protocols.
              </p>
            </div>
            <div className="lattice-foundation-block">
              <div className="lattice-foundation-icon">
                <Layers size={24} strokeWidth={1.5} />
              </div>
              <h3>Conflict-Free Replication</h3>
              <p>
                This design makes the Lattice a Conflict-free Replicated Data Type (CRDT). It guarantees eventual consistency across the network, requiring only occasional gossip between nodes. No continuous connectivity needed—simple, intermittent sharing of lattice values keeps the system in perfect sync.
              </p>
            </div>
            <div className="lattice-foundation-block">
              <div className="lattice-foundation-icon">
                <Shield size={24} strokeWidth={1.5} />
              </div>
              <h3>Cryptographic Integrity</h3>
              <p>
                All data is immutable, content-addressable, and structured as Merkle trees. Digital signatures and cryptographic hashes ensure secure, tamper-proof operation. Conditional acceptance rules thwart malicious actors—invalid values are rejected outright by the network.
              </p>
            </div>
            <div className="lattice-foundation-block">
              <div className="lattice-foundation-icon">
                <FileCode size={24} strokeWidth={1.5} />
              </div>
              <h3>Merge Context</h3>
              <p>
                A key innovation: the merge process uses three inputs—context, the existing trusted value, and the received value. This ensures merges are intelligent and secure. Only portions that pass cryptographic validation are accepted, with the trusted value always prioritised.
              </p>
            </div>
          </div>
        </section>

        {/* Regions */}
        <section className="vision-section">
          <div className="section-header">
            <span className="section-number">// 002</span>
            <h2>Regions of the Lattice</h2>
            <p>A flexible framework of specialised sub-lattices</p>
          </div>

          <div className="lattice-regions">
            {regions.map((r) => (
              <article key={r.title} className="lattice-region-card">
                <div className="lattice-region-icon">{r.icon}</div>
                <div className="lattice-region-content">
                  <h4>{r.title}</h4>
                  <p>{r.text}</p>
                  <Link
                    href={r.link}
                    className="vision-stack-link"
                    target={r.external ? '_blank' : undefined}
                    rel={r.external ? 'noopener noreferrer' : undefined}
                  >
                    {r.linkLabel} <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Engineering */}
        <section className="vision-section">
          <div className="section-header">
            <span className="section-number">// 003</span>
            <h2>Engineering for Scale</h2>
            <p>How we build a global data structure of unlimited size</p>
          </div>

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
          <div className="section-header">
            <span className="section-number">// 004</span>
            <h2>Key Properties</h2>
            <p>What makes the Lattice unique</p>
          </div>

          <div className="vision-pillars">
            <article className="vision-pillar">
              <span className="vision-pillar-number">∞</span>
              <h3>Unlimited Scale</h3>
              <p>
                Selective attention means nodes only handle what they need. The lattice grows without bound while each participant scales resources independently. No shards, no cross-chain complexity.
              </p>
            </article>
            <article className="vision-pillar">
              <span className="vision-pillar-number">100%</span>
              <h3>Peer-to-Peer</h3>
              <p>
                No centralised services. No single source of truth for off-chain data. Users have full control over data storage and sharing. Code is also data—programs and AI models can be stored and executed on the lattice alone.
              </p>
            </article>
            <article className="vision-pillar">
              <span className="vision-pillar-number">0</span>
              <h3>Zero Coordination</h3>
              <p>
                The CRDT design guarantees eventual consistency without complex coordination protocols. Simple, occasional gossip between nodes suffices. The lattice self-heals and self-replicates across the network.
              </p>
            </article>
          </div>
        </section>

        {/* CTA */}
        <section className="vision-cta">
          <h2>Explore the Lattice</h2>
          <p>Experiment with lattice technology on the live testnet or explore the consensus layer that powers it.</p>
          <div className="btn-group">
            <Link href="/cpos" className="btn btn-primary">
              Explore CPoS
            </Link>
            <Link href="/sandbox" className="btn btn-secondary">
              Try the Sandbox
            </Link>
          </div>
        </section>

        <div className="geo-line" aria-hidden="true" />
      </main>
      <Footer />
    </>
  );
}
