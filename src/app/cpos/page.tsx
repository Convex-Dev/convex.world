import Link from "next/link";
import { Shield, Zap, Clock, Users, Lock, Leaf, GitMerge, Layers } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CposHexAnimation from "@/components/CposHexAnimation";

const advantages = [
  {
    icon: <Clock size={22} strokeWidth={1.5} />,
    title: "Millisecond Finality",
    text: "No block delay. No mempool. Transactions confirm in milliseconds, not minutes. CPoS is limited only by the speed of light.",
  },
  {
    icon: <Users size={22} strokeWidth={1.5} />,
    title: "Leaderless",
    text: "Any peer may propose a block at any time. No leader election, no sequential bottleneck, no single point of failure. Blocks are proposed concurrently.",
  },
  {
    icon: <Shield size={22} strokeWidth={1.5} />,
    title: "Byzantine Fault Tolerant",
    text: "Consensus is guaranteed and stable as long as at least 2/3 of voting power follows the protocol honestly. Proven secure against even powerful adversaries.",
  },
  {
    icon: <Lock size={22} strokeWidth={1.5} />,
    title: "Front-running Resistant",
    text: "Users submit transactions to a trusted peer—not broadcast to a public mempool. No opportunity for miners or validators to reorder transactions for profit.",
  },
  {
    icon: <Leaf size={22} strokeWidth={1.5} />,
    title: "100% Green",
    text: "No Proof of Work. No energy-intensive mining. CPoS achieves superior security using a fraction of the power—ecologically defensible by design.",
  },
  {
    icon: <Zap size={22} strokeWidth={1.5} />,
    title: "Atomic Execution",
    text: "Every transaction executes fully or rolls back completely. Turing-complete logic with automatic failure protection eliminates partial failures.",
  },
];

export default function CPoS() {
  return (
    <>
      <Navigation />
      <main>
        <div className="lattice-bg" aria-hidden="true" />

        {/* Hero */}
        <section className="vision-hero">
          <div className="vision-hero-content">
            <span className="dev-hero-tag">// Consensus</span>
            <h1>Convergent<br /><span className="hero-accent">Proof of Stake</span></h1>
            <p className="vision-hero-text">
              The world&apos;s fastest truly decentralised consensus algorithm for a global state machine. CPoS operates as a CRDT, not a blockchain, solving the scalability trilemma.
            </p>
          </div>
          <div className="vision-hero-visual">
            <CposHexAnimation />
          </div>
        </section>

        {/* How It Works */}
        <section className="vision-section">
          <div className="section-header">
            <span className="section-number">// 001</span>
            <h2>How CPoS Works</h2>
            <p>Consensus through convergence, not competition</p>
          </div>

          <div className="cpos-explainer">
            <div className="cpos-step">
              <div className="cpos-step-number">
                <GitMerge size={20} strokeWidth={1.5} />
              </div>
              <div className="cpos-step-content">
                <h3>Belief Propagation</h3>
                <p>
                  Each peer maintains a Belief—a data structure representing its view of consensus across the whole network, including the latest block orderings from other peers. Beliefs are shared through random gossip between peers, requiring only occasional communication to keep the system in sync.
                </p>
              </div>
            </div>

            <div className="cpos-step">
              <div className="cpos-step-number">
                <Layers size={20} strokeWidth={1.5} />
              </div>
              <div className="cpos-step-content">
                <h3>Belief Merge Function</h3>
                <p>
                  When a peer receives beliefs from others, it applies the Belief Merge Function—a mathematical operation that combines beliefs into an updated view. This function is idempotent, commutative, and associative, forming a join-semilattice that satisfies the conditions of a Conflict-free Replicated Data Type (CRDT). Repeated applications automatically converge to a stable consensus.
                </p>
              </div>
            </div>

            <div className="cpos-step">
              <div className="cpos-step-number">
                <Shield size={20} strokeWidth={1.5} />
              </div>
              <div className="cpos-step-content">
                <h3>Stake-Weighted Voting</h3>
                <p>
                  Conflicts in proposed block orderings are resolved by stake-weighted voting. Peers compute total stake voting for each proposed block at each position. Peers supporting minority orderings are excluded from subsequent votes, creating a strong incentive to align with the majority. This procedure provably converges to a single ordering.
                </p>
              </div>
            </div>

            <div className="cpos-step">
              <div className="cpos-step-number">
                <Lock size={20} strokeWidth={1.5} />
              </div>
              <div className="cpos-step-content">
                <h3>Two-Phase Commit</h3>
                <p>
                  Once 2/3 of peers align on the same ordering, a Proposed Consensus Point is established. When 2/3 of peers confirm this proposal, consensus is finalised. From this point, the ordering is immutable. Digital signatures ensure no peer can impersonate another—full cryptographic security is maintained throughout.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Not a Blockchain */}
        <section className="vision-section">
          <div className="section-header">
            <span className="section-number">// 002</span>
            <h2>Not a Blockchain</h2>
            <p>A fundamentally different architecture</p>
          </div>

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
          <div className="section-header">
            <span className="section-number">// 003</span>
            <h2>Advantages</h2>
            <p>What CPoS delivers</p>
          </div>

          <div className="vision-principles-grid">
            {advantages.map((a) => (
              <article key={a.title} className="vision-principle-card">
                <div className="vision-principle-icon">{a.icon}</div>
                <h4>{a.title}</h4>
                <p>{a.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Security Guarantees */}
        <section className="vision-section">
          <div className="section-header">
            <span className="section-number">// 004</span>
            <h2>Security Guarantees</h2>
            <p>Proven stability under adversarial conditions</p>
          </div>

          <div className="vision-pillars">
            <article className="vision-pillar">
              <span className="vision-pillar-number">51%</span>
              <h3>Majority Stability</h3>
              <p>
                If more than 50% of peers adopt the same ordering and are mutually aware of each other&apos;s agreement, the ordering is provably stable—no matter what adversaries attempt.
              </p>
            </article>
            <article className="vision-pillar">
              <span className="vision-pillar-number">67%</span>
              <h3>Byzantine Threshold</h3>
              <p>
                With at least 2/3 of peers aligned and fewer than 1/3 being adversarial, consensus is provably stable against irrelevant alternatives and colluding attackers.
              </p>
            </article>
            <article className="vision-pillar">
              <span className="vision-pillar-number">75%</span>
              <h3>Adversary Resistance</h3>
              <p>
                With 75% alignment, consensus holds even against adversaries capable of temporarily isolating peers, censoring messages, or delaying activity of honest participants.
              </p>
            </article>
          </div>
        </section>

        {/* CTA */}
        <section className="vision-cta">
          <h2>Dive deeper</h2>
          <p>Explore the full Convex technology stack or start building on the network today.</p>
          <div className="btn-group">
            <Link href="/lattice" className="btn btn-primary">
              Explore the Lattice
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
