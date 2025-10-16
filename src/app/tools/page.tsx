import Image from "next/image";
import Link from "next/link";

interface Tool {
  title: string;
  description: string;
  link: {
    href: string;
    isExternal: boolean;
  };
  icon: string;
}

const tools: Tool[] = [
  {
    title: "Explorer",
    description: "Explore the Convex network, view transactions, blocks, and network activity in real-time.",
    link: {
      href: "https://peer.convex.live",
      isExternal: true
    },
    icon: "/images/logo_dark_blue.svg"
  },
  {
    title: "REST API",
    description: "Access Convex network data and functionality through our comprehensive REST API endpoints.",
    link: {
      href: "/tools/rest-api",
      isExternal: false
    },
    icon: "/images/logo_dark_blue.svg"
  },
  {
    title: "CLI Tool",
    description: "Command-line interface for interacting with the Convex network, managing accounts, and deploying smart contracts.",
    link: {
      href: "https://docs.convex.world/docs/products/convex-cli",
      isExternal: true
    },
    icon: "/images/logo_dark_blue.svg"
  },
  {
    title: "Convex SDK",
    description: "Libraries for multiple programming languages to build applications on Convex.",
    link: {
      href: "https://docs.convex.world/docs/sdk",
      isExternal: true
    },
    icon: "/images/logo_dark_blue.svg"
  },
];

export default function Tools() {
  return (
    <main>
      <div className="container">
        <div className="hero-section">
          <h1>Developer Tools</h1>
          <p className="intro-text">
            Everything you need to build on the Convex network
          </p>
        </div>

        <div className="tools-grid">
          {tools.map((tool) => (
            <article key={tool.title} className="card">
              {tool.link.isExternal ? (
                <a
                  href={tool.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ToolContent tool={tool} />
                </a>
              ) : (
                <Link href={tool.link.href}>
                  <ToolContent tool={tool} />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

function ToolContent({ tool }: { tool: Tool }) {
  return (
    <>
      <div className="tool-header">
        <h3>{tool.title}</h3>
        <Image
          src={tool.icon}
          alt={`${tool.title} Icon`}
          width={70}
          height={40}
          className="tool-icon"
        />
      </div>
      <p className="description-text">{tool.description}</p>
      <div className="tool-footer">
        <span>
          {tool.link.isExternal ? "Learn more" : "View documentation"}
        </span>
        {tool.link.isExternal && (
          <Image src="/link.svg" alt="External Link" width={16} height={16} className="external-link-icon" />
        )}
      </div>
    </>
  );
} 