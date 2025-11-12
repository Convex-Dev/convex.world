import Link from 'next/link';

interface FeatureLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FeatureBox {
  title: string;
  description: string;
  links?: FeatureLink[];
}

const features: FeatureBox[] = [
  {
    title: "Realtime Consensus",
    description: "Beyond blockchain - Convex achieves consensus in milliseconds with zero block delay.",
    links: [
      {
        label: "Whitepaper",
        href: "https://docs.convex.world/docs/overview/convex-whitepaper",
        external: true,
      }
    ],
  },
  {
    title: "Global Scale",
    description: "Lattice Technology gives every project its own global data fabric",
    links: [
      {
        label: "Lattice Technology",
        href: "https://docs.convex.world/docs/overview/lattice",
        external: true,
      },
    ],
  },  
  {
    title: "Ultimate Performance",
    description: "The world's fastest decentralised VM - execute 1 million transactions on shared global state per second",
    links: [
      {
        label: "Performance",
        href: "docs/overview/performance",
        external: true,
      }
    ],
  },
  {
    title: "Developer Magic",
    description: "Securely execute complex economic transactions in a single line of code",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Convex-Dev",
        external: true,
      },
      {
        label: "Docs",
        href: "https://docs.convex.world",
        external: true,
      },
    ],
  },
  {
    title: "Agentic Future",
    description: "Designed to support the next generation of autonomous economic agents",
    links: [
      {
        label: "MCP Support",
        href: "https://docs.convex.world/docs/overview/agentic-architecture",
        external: true,
      },
    ],
  },
  {
    title: "Public Mission",
    description: "Governed on a non-profit basis for the good of humanity - as we move into the age of AI",
    links: [
      {
        label: "Convex Foundation",
        href: "https://docs.convex.world/docs/overview/governance",
        external: true,
      },
      {
        label: "Manifesto",
        href: "https://docs.convex.world/docs/overview/manifesto",
        external: true,
      },
      {
        label: "Tokenomics",
        href: "https://docs.convex.world/docs/cad/tokenomics",
        external: true,
      }
    ],
  }
];

export default function FeatureBoxes() {
  return (
    <section>
      <div className="tools-grid">
        {features.map((feature, index) => (
          <article key={index} className="card">
            <header>
              <h4>{feature.title}</h4>
            </header>
            <p className="description-text">{feature.description}</p>
            {feature.links?.length ? (
              <div className="card-links">
                {feature.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="card-link"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}