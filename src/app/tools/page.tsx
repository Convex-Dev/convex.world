import Link from "next/link";
import { 
  Code2,
  Compass, 
  Monitor, 
  Globe, 
  Terminal as TerminalIcon, 
  Boxes,
  ArrowUpRight,
  LucideIcon
} from "lucide-react";

interface ToolLink {
  name: string;
  href: string;
  isExternal?: boolean;
}

interface Tool {
  title: string;
  description: string;
  icon: LucideIcon;
  links: ToolLink[];
}

const tools: Tool[] = [
  {
    title: "Sandbox",
    description: "Interactive REPL to run Convex Lisp queries and transactions on the testnet. Try examples, inspect state, and observe Juice costs.",
    icon: Code2,
    links: [{ name: "Open Sandbox", href: "/sandbox" }]
  },
  {
    title: "Explorer",
    description: "Explore the Convex network, view transactions, blocks, and network activity in real-time.",
    icon: Compass,
    links: [
      { name: "Protonet", href: "https://peer.convex.live/explorer", isExternal: true },
      { name: "Testnet", href: "https://mikera1337-convex-testnet.hf.space/explorer", isExternal: true }
    ]
  },
  {
    title: "Convex Desktop",
    description: "Desktop application for power users and developers. Interact as a wallet and run local test networks.",
    icon: Monitor,
    links: [{ name: "Docs", href: "https://docs.convex.world/docs/products/convex-desktop", isExternal: true }]
  },
  {
    title: "REST API",
    description: "Access Convex network data and functionality through comprehensive REST API endpoints.",
    icon: Globe,
    links: [{ name: "View docs", href: "/tools/rest-api" }]
  },
  {
    title: "CLI Tool",
    description: "Command-line interface for interacting with the network, managing accounts, and deploying contracts.",
    icon: TerminalIcon,
    links: [{ name: "Docs", href: "https://docs.convex.world/docs/products/convex-cli", isExternal: true }]
  },
  {
    title: "Convex SDK",
    description: "Libraries for multiple programming languages to build applications on Convex.",
    icon: Boxes,
    links: [{ name: "Docs", href: "https://docs.convex.world/docs/sdk", isExternal: true }]
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
          <span className="hero-accent">Convex</span>
          {" "}Tools
        </h1>
        <p>
          Everything you need to explore, build, test, and deploy
        </p>
      </section>

      {/* Tools Grid */}
      <section className="tools-section">

        <div className="tools-grid">
          {tools.map((tool, i) => {
            const IconComponent = tool.icon;
            const number = (i + 1).toString().padStart(2, "0");
            return (
              <div key={tool.title} className="tool-card-wrapper">
                <article className="tool-card">
                  <div className="tool-card-header">
                    <div className="tool-card-icon">
                      <IconComponent size={24} strokeWidth={1.5} />
                    </div>
                    <h3>{tool.title}</h3>
                    <span className="tool-card-number">{number}</span>
                  </div>
                  <p>{tool.description}</p>
                  <div className="tool-card-links">
                    {tool.links.map((link) => {
                      const ext = link.isExternal ?? false;
                      const inner = (
                        <>
                          <span>{link.name}</span>
                          {ext && <ArrowUpRight size={14} aria-hidden />}
                        </>
                      );
                      return ext ? (
                        <a
                          key={link.href + link.name}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tool-card-link"
                        >
                          {inner}
                        </a>
                      ) : (
                        <Link key={link.href + link.name} href={link.href} className="tool-card-link">
                          {inner}
                        </Link>
                      );
                    })}
                  </div>
                </article>
              </div>
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