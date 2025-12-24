import Link from "next/link";
import Image from "next/image";
import { 
  Cpu, 
  Database, 
  BookOpen,
  Terminal,
  Boxes,
  Zap
} from "lucide-react";

export default function Developer() {
  return (
    <main>
      {/* Lattice Background */}
      <div className="lattice-bg" aria-hidden="true">
        <div className="lattice-node lattice-node-1" />
        <div className="lattice-node lattice-node-2" />
        <div className="lattice-node lattice-node-3" />
      </div>

      {/* Hero Section - Asymmetric Layout */}
      <section className="dev-hero-split">
        <div className="dev-hero-content">
          <span className="dev-hero-tag">// Developer Platform</span>
          <h1>Build on the<br /><span className="hero-accent">Lattice</span></h1>
          <p>
            Create intelligent economic systems with a unified fabric for compute, 
            data, and value—purpose-built for humans and AI.
          </p>
          <div className="btn-group">
            <Link href="https://docs.convex.world" className="btn btn-primary" target="_blank">
              Read the Docs
            </Link>
            <Link href="https://github.com/Convex-Dev" className="btn btn-secondary" target="_blank">
              Explore GitHub
            </Link>
          </div>
        </div>
        <div className="dev-hero-visual">
          <div className="dev-code-showcase">
            <div className="dev-code-header">
              <span className="dev-code-dot"></span>
              <span className="dev-code-dot"></span>
              <span className="dev-code-dot"></span>
              <span className="dev-code-title">convex-lisp</span>
            </div>
            <div className="dev-code-body">
              <code>(import convex.fungible :as fun)</code>
              <code>{`(deploy (fun/build-token {:supply 1000000}))`}</code>
              <code>(fun/transfer token recipient 1000)</code>
            </div>
          </div>
        </div>
      </section>

      {/* Core Technologies */}
      <section className="dev-section">
        <div className="section-header">
          <span className="section-number">// 001</span>
          <h2>Core Technologies</h2>
          <p>The foundational layers that power the Convex network</p>
        </div>

        <div className="dev-grid">
          {/* CVM Card */}
          <article className="dev-card dev-card-featured">
            <span className="dev-card-number">01</span>
            <div className="dev-card-icon">
              <Cpu size={24} strokeWidth={1.5} />
            </div>
            <h3>Convex Virtual Machine</h3>
            <p>
              A deterministic, high-performance decentralised runtime engine that manages 
              trusted global state—suitable for smart contracts, digital assets, autonomous 
              agents, and trust registries.
            </p>
            <ul className="dev-features">
              <li><Zap size={14} /> Turing Complete execution</li>
              <li><Zap size={14} /> 1M+ transactions per second</li>
              <li><Zap size={14} /> 100% green consensus</li>
              <li><Zap size={14} /> On-chain compiler</li>
            </ul>
          </article>

          {/* Convex Lisp Card */}
          <article className="dev-card dev-card-featured">
            <span className="dev-card-number">02</span>
            <div className="dev-card-icon">
              <Image src="/images/convex86.webp" alt="Convex" width={24} height={24} />
            </div>
            <h3>Convex Lisp</h3>
            <p>
              A modern Lisp dialect inspired by{" "}
              <a href="https://clojure.org" target="_blank" rel="noopener noreferrer">Clojure</a>—powerful, 
              expressive, and designed for composable economic systems that both humans and AI can understand.
            </p>
            <p>
              Write code like this and have it execute reliably on the CVM:
            </p>
            <div className="dev-inline-code">
              <code>(if (trusted? addr) (fun/transfer token addr 1000))</code>
            </div>
            <p className="dev-highlight">
              <strong>One Line DeFi</strong> — a single expression can represent 
              a complete economic transaction.
            </p>
          </article>

          {/* Lattice Data Card */}
          <article className="dev-card">
            <span className="dev-card-number">03</span>
            <div className="dev-card-icon">
              <Database size={24} strokeWidth={1.5} />
            </div>
            <h3>Lattice Data</h3>
            <p className="dev-tagline">
              One global data structure. Billions of writers. Trillions of readers. 
              Zero centralised infrastructure.
            </p>
            <p>
              Lattice technology gives every project a deterministic data fabric. Persist state, 
              stream events, and share knowledge between services without custom databases or message queues.
            </p>
          </article>
        </div>
      </section>

      {/* Getting Started */}
      <section className="dev-section">
        <div className="section-header">
          <span className="section-number">// 002</span>
          <h2>Getting Started</h2>
          <p>Everything you need to start building on Convex</p>
        </div>

        <div className="dev-resources-grid">
          <Link href="https://docs.convex.world/docs/intro" className="dev-resource-card" target="_blank">
            <BookOpen size={20} strokeWidth={1.5} />
            <div>
              <h4>Documentation</h4>
              <p>Comprehensive guides and API references</p>
            </div>
          </Link>
          <Link href="https://docs.convex.world/docs/tutorial/convex-lisp" className="dev-resource-card" target="_blank">
            <Terminal size={20} strokeWidth={1.5} />
            <div>
              <h4>Convex Lisp Tutorial</h4>
              <p>Learn the language with hands-on examples</p>
            </div>
          </Link>
          <Link href="https://docs.convex.world/docs/tools" className="dev-resource-card" target="_blank">
            <Boxes size={20} strokeWidth={1.5} />
            <div>
              <h4>SDKs & Tools</h4>
              <p>Libraries for Java, JavaScript, and more</p>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="dev-cta">
        <div className="dev-cta-content">
          <h2>Ready to build?</h2>
          <p>
            Whether you&apos;re prototyping a new protocol, building an AI-native marketplace, 
            or integrating with existing systems—Convex gives you the tools to design 
            resilient, scalable experiences.
          </p>
          <div className="btn-group">
            <Link href="https://docs.convex.world" className="btn btn-primary" target="_blank">
              Start Building
            </Link>
            <Link href="https://discord.com/invite/xfYGq4CT7v" className="btn btn-secondary" target="_blank">
              Join Discord
            </Link>
          </div>
        </div>
      </section>

      <div className="geo-line" aria-hidden="true" />
    </main>
  );
}

