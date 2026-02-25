import Link from "next/link";
import Image from "next/image";
import { BookOpen, Terminal, Boxes, Zap, Code2, Github, FileCode } from "lucide-react";
import AnimatedTerminal from "@/components/AnimatedTerminal";
import ContentPage from "@/components/ContentPage";
import SectionHeader from "@/components/SectionHeader";
import CtaSection from "@/components/CtaSection";
import CvmIcon from "@/components/icons/CvmIcon";
import LatticeDataIcon from "@/components/icons/LatticeDataIcon";
import StructuredData from "@/lib/structured-data";
import { heroTerminalSequences } from "@/data/developer-terminal-sequences";

export const metadata = {
  title: "Developers",
  description: "Build economic systems on the Convex lattice. Convex Lisp, CVM runtime, TypeScript and Java SDKs, and comprehensive documentation.",
};

export default function Developer() {
  return (
    <ContentPage>
      {/* Hero Section - Asymmetric Layout */}
      <section className="dev-hero-split">
        <div className="dev-hero-content">
          <span className="dev-hero-tag">// Builder Interface</span>
          <h1>Build on the<br /><span className="hero-accent">Lattice</span></h1>
          <p>Build economic systems where humans and autonomous agents participate under the same rules, the same costs, and the same finality.</p>
          <div className="btn-group">
            <Link href="https://docs.convex.world" className="btn btn-primary" target="_blank">
              Read Documentation
            </Link>
            <Link href="https://github.com/Convex-Dev" className="btn btn-secondary" target="_blank">
              View Source
            </Link>
          </div>
        </div>
        <div className="dev-hero-visual">
          <AnimatedTerminal sequences={heroTerminalSequences} title="convex-lisp" />
        </div>
      </section>

      {/* Core Technologies */}
      <section className="dev-section">
        <SectionHeader number="001" title="Core Technologies" subtitle="The foundational layers that power the Convex network" />
        <div className="dev-grid">
          {/* CVM Card */}
          <article className="dev-card dev-card-featured">
            <span className="dev-card-number">01</span>
            <div className="dev-card-icon dev-card-icon-cvm">
              <CvmIcon />
            </div>
            <h3>Convex Virtual Machine</h3>
            <p>A deterministic, high-performance decentralised runtime engine that manages trusted global state—suitable for smart contracts, digital assets, autonomous agents, and trust registries.</p>
            <ul className="dev-features">
              <li><Zap size={14} /> Turing Complete execution</li>
              <li><Zap size={14} /> 1M+ transactions per second</li>
              <li><Zap size={14} /> 100% green consensus</li>
              <li><Zap size={14} /> On-chain compiler</li>
            </ul>
            <Link href="https://docs.convex.world/docs/cad/virtual-machine" className="dev-card-link" target="_blank">
              Read More →
            </Link>
          </article>

          {/* Convex Lisp Card */}
          <article className="dev-card dev-card-featured">
            <span className="dev-card-number">02</span>
            <div className="dev-card-icon">
              <Image src="/images/convex86.webp" alt="Convex" width={24} height={24} />
            </div>
            <h3>Convex Lisp</h3>
            <p>A modern Lisp dialect inspired by Clojure—powerful, expressive, and designed for composable economic systems that both humans and autonomous agents can understand.</p>
            <p>Express economic logic that executes deterministically on the CVM:</p>
            <div className="dev-inline-code">
              <code>(if (trusted? addr) (fun/transfer token addr 1000))</code>
            </div>
            <p className="dev-highlight">
              <strong>Offers resolve to settlements — a single expression can represent a complete economic transaction.</strong>
            </p>
            <Link href="https://docs.convex.world/docs/cad/lisp" className="dev-card-link" target="_blank">
              Read More →
            </Link>
          </article>

          {/* Lattice Data Card */}
          <article className="dev-card">
            <span className="dev-card-number">03</span>
            <div className="dev-card-icon dev-card-icon-lattice">
              <LatticeDataIcon />
            </div>
            <h3>Lattice Data</h3>
            <p className="dev-tagline">One global data structure. Billions of writers. Trillions of readers. Zero centralised infrastructure.</p>
            <p>Lattice technology gives every project a deterministic data fabric. Persist state, stream events, and share knowledge between services without custom databases or message queues.</p>
            <Link href="https://docs.convex.world/docs/overview/lattice" className="dev-card-link" target="_blank">
              Read More →
            </Link>
          </article>
        </div>
      </section>

      {/* Getting Started */}
      <section className="dev-section">
        <SectionHeader number="002" title="Getting Started" subtitle="Everything you need to start building on Convex" />
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
          <Link href="https://github.com/Convex-Dev" className="dev-resource-card" target="_blank">
            <Github size={20} strokeWidth={1.5} />
            <div>
              <h4>GitHub</h4>
              <p>Source code and examples</p>
            </div>
          </Link>
          <Link href="/sandbox" className="dev-resource-card">
            <Code2 size={20} strokeWidth={1.5} />
            <div>
              <h4>REPL Sandbox</h4>
              <p>Try Convex Lisp in a live console on the testnet</p>
            </div>
          </Link>
          <Link href="https://docs.convex.world/docs/tutorial/client-sdks/typescript" className="dev-resource-card" target="_blank">
            <Boxes size={20} strokeWidth={1.5} />
            <div>
              <h4>TypeScript SDK</h4>
              <p>Client library for JavaScript and TypeScript</p>
            </div>
          </Link>
          <Link href="https://github.com/Convex-Dev/convex/tree/develop/convex-java" className="dev-resource-card" target="_blank">
            <Boxes size={20} strokeWidth={1.5} />
            <div>
              <h4>Java Client API</h4>
              <p>Client library for Java/JVM applications</p>
            </div>
          </Link>
          <Link href="https://docs.convex.world/docs/cad/0000cads" className="dev-resource-card" target="_blank">
            <FileCode size={20} strokeWidth={1.5} />
            <div>
              <h4>CADs</h4>
              <p>Convex Architecture Documents</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Builder Section */}
      <section className="dev-cta">
        <div className="dev-cta-content">
          <h2>Build Economic Systems</h2>
          <p>Convex is for people building economic systems where humans and autonomous agents must coexist safely. Costs and constraints are visible. State converges deterministically.</p>
          <div className="btn-group">
            <Link href="https://docs.convex.world" className="btn btn-primary" target="_blank">
              Read Documentation
            </Link>
            <Link href="https://discord.com/invite/xfYGq4CT7v" className="btn btn-secondary" target="_blank">
              Join Community
            </Link>
          </div>
        </div>
      </section>
      <StructuredData type="WebPage" metadata={metadata} path="/developers/" />
    </ContentPage>
  );
}
