import Link from 'next/link';
import { 
  Waves, 
  Orbit, 
  Gauge, 
  Code2, 
  Bot, 
  Landmark 
} from 'lucide-react';

interface FeatureLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FeatureBox {
  title: string;
  description: string;
  icon: React.ReactNode;
  links?: FeatureLink[];
}

const features: FeatureBox[] = [
  {
    title: "Realtime Consensus",
    description: "Beyond blockchain—Convex achieves consensus in milliseconds with zero block delay using Convergent Proof of Stake.",
    icon: <Waves size={22} strokeWidth={1.5} />,
    links: [
      { label: "Whitepaper", href: "https://docs.convex.world/docs/overview/convex-whitepaper", external: true }
    ],
  },
  {
    title: "Global Scale",
    description: "Lattice Technology provides every project its own global data fabric with infinite horizontal scalability.",
    icon: <Orbit size={22} strokeWidth={1.5} />,
    links: [
      { label: "Lattice Technology", href: "https://docs.convex.world/docs/overview/lattice", external: true }
    ],
  },  
  {
    title: "Ultimate Performance",
    description: "The world's fastest decentralised VM—execute 1 million transactions per second on shared global state.",
    icon: <Gauge size={22} strokeWidth={1.5} />,
    links: [
      { label: "Performance", href: "https://docs.convex.world/docs/overview/performance", external: true }
    ],
  },
  {
    title: "Developer Magic",
    description: "Securely execute complex economic transactions in a single line of code with Convex Lisp.",
    icon: <Code2 size={22} strokeWidth={1.5} />,
    links: [
      { label: "GitHub", href: "https://github.com/Convex-Dev", external: true },
      { label: "Documentation", href: "https://docs.convex.world", external: true }
    ],
  },
  {
    title: "Agentic Future",
    description: "Designed to support the next generation of autonomous economic agents with native MCP integration.",
    icon: <Bot size={22} strokeWidth={1.5} />,
    links: [
      { label: "Agentic Architecture", href: "https://docs.convex.world/docs/overview/agentic-architecture", external: true }
    ],
  },
  {
    title: "Public Mission",
    description: "Governed on a non-profit basis for the good of humanity as we move into the age of AI.",
    icon: <Landmark size={22} strokeWidth={1.5} />,
    links: [
      { label: "Foundation", href: "https://docs.convex.world/docs/overview/governance", external: true },
      { label: "Manifesto", href: "https://docs.convex.world/docs/overview/manifesto", external: true },
      { label: "Tokenomics", href: "https://docs.convex.world/docs/cad/tokenomics", external: true }
    ],
  }
];

export default function FeatureBoxes() {
  return (
    <div className="features-grid">
      {features.map((feature, index) => (
        <article key={index} className="feature-card">
          <span className="feature-number">0{index + 1}</span>
          <div className="feature-icon">
            {feature.icon}
          </div>
          <h4>{feature.title}</h4>
          <p>{feature.description}</p>
          {feature.links?.length ? (
            <div className="feature-links">
              {feature.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="feature-link"
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ) : null}
          <div className="feature-corner-br" aria-hidden="true" />
        </article>
      ))}
    </div>
  );
}