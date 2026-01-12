import Link from "next/link";
import { 
  Compass, 
  Monitor, 
  Globe, 
  Terminal as TerminalIcon, 
  Boxes,
  ArrowUpRight,
  LucideIcon
} from "lucide-react";

interface Tool {
  title: string;
  description: string;
  href: string;
  isExternal: boolean;
  icon: LucideIcon;
  number: string;
}

const tools: Tool[] = [
  {
    title: "Explorer",
    description: "Explore the Convex network, view transactions, blocks, and network activity in real-time.",
    href: "https://peer.convex.live",
    isExternal: true,
    icon: Compass,
    number: "01"
  },
  {
    title: "Convex Desktop",
    description: "Desktop application for power users and developers. Interact as a wallet and run local test networks.",
    href: "https://docs.convex.world/docs/products/convex-desktop",
    isExternal: true,
    icon: Monitor,
    number: "02"
  },
  {
    title: "REST API",
    description: "Access Convex network data and functionality through comprehensive REST API endpoints.",
    href: "/tools/rest-api",
    isExternal: false,
    icon: Globe,
    number: "03"
  },
  {
    title: "CLI Tool",
    description: "Command-line interface for interacting with the network, managing accounts, and deploying contracts.",
    href: "https://docs.convex.world/docs/products/convex-cli",
    isExternal: true,
    icon: TerminalIcon,
    number: "04"
  },
  {
    title: "Convex SDK",
    description: "Libraries for multiple programming languages to build applications on Convex.",
    href: "https://docs.convex.world/docs/sdk",
    isExternal: true,
    icon: Boxes,
    number: "05"
  },
];

export default function Tools() {
  return (
    <main>
      {/* Lattice Background */}
      <div className="lattice-bg" aria-hidden="true">
        <div className="lattice-node lattice-node-1" />
        <div className="lattice-node lattice-node-2" />
        <div className="lattice-node lattice-node-3" />
      </div>

      {/* Hero Section */}
      <section className="tools-hero">
        <div className="hero-eyebrow">
          <div className="hero-label">Developer Resources</div>
        </div>
        <h1>
          Tools for building on{" "}
          <span className="hero-accent">Convex</span>
        </h1>
        <p>
          Everything you need to build, test, and deploy on the Convex network—from 
          explorers and SDKs to command-line interfaces.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="tools-section">
        <div className="section-header">
          <span className="section-number">// 001</span>
          <h2>Core Tools</h2>
          <p>Production-ready tools for Convex development</p>
        </div>

        <div className="tools-grid">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            const content = (
              <article className="tool-card">
                <span className="tool-card-number">{tool.number}</span>
                <div className="tool-card-icon">
                  <IconComponent size={24} strokeWidth={1.5} />
                </div>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <div className="tool-card-link">
                  <span>{tool.isExternal ? "Open tool" : "View docs"}</span>
                  {tool.isExternal && <ArrowUpRight size={14} />}
                </div>
              </article>
            );

            return tool.isExternal ? (
              <a
                key={tool.title}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="tool-card-wrapper"
              >
                {content}
              </a>
            ) : (
              <Link key={tool.title} href={tool.href} className="tool-card-wrapper">
                {content}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="tools-section">
        <div className="section-header">
          <span className="section-number">// 002</span>
          <h2>Quick Start</h2>
          <p>Get up and running with the Convex CLI</p>
        </div>

        <div className="tools-quickstart">
          <div className="quickstart-step">
            <span className="quickstart-number">1</span>
            <div className="quickstart-content">
              <h4>Install Java 21+</h4>
              <div className="quickstart-code">
                <code>java --version</code>
              </div>
              <p className="quickstart-note">
                Download from{" "}
                <a href="https://adoptium.net/temurin/releases/" target="_blank" rel="noopener noreferrer">
                  Eclipse Temurin
                </a>
                {" "}or{" "}
                <a href="https://www.oracle.com/java/technologies/downloads/" target="_blank" rel="noopener noreferrer">
                  Oracle JDK
                </a>
              </p>
            </div>
          </div>
          <div className="quickstart-step">
            <span className="quickstart-number">2</span>
            <div className="quickstart-content">
              <h4>Download convex.jar</h4>
              <div className="quickstart-code">
                <code>curl -O https://convex.world/convex.jar</code>
              </div>
              <p className="quickstart-note">
                Or download from the{" "}
                <a href="https://docs.convex.world/docs/products/convex-cli" target="_blank" rel="noopener noreferrer">
                  CLI documentation
                </a>
              </p>
            </div>
          </div>
          <div className="quickstart-step">
            <span className="quickstart-number">3</span>
            <div className="quickstart-content">
              <h4>Run the CLI</h4>
              <div className="quickstart-code">
                <code>java -jar convex.jar</code>
              </div>
              <p className="quickstart-note">
                See{" "}
                <a href="https://docs.convex.world/docs/products/convex-cli" target="_blank" rel="noopener noreferrer">
                  full CLI docs
                </a>
                {" "}for commands and setup aliases
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tools-cta">
        <h3>Ready to build?</h3>
        <p>Explore the documentation for in-depth guides and API references.</p>
        <div className="btn-group">
          <Link href="https://docs.convex.world" className="btn btn-primary" target="_blank">
            Read the Docs
          </Link>
          <Link href="/developers" className="btn btn-secondary">
            Developer Overview
          </Link>
        </div>
      </section>

      <div className="geo-line" aria-hidden="true" />
    </main>
  );
}