import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Users, Building2, Globe2 } from "lucide-react";

const ecosystemItems = [
  {
    title: "Covia.ai",
    description: "Building the universal grid for AI, enabling powerful AI agent ecosystems across organisational boundaries.",
    image: "/images/covia.webp",
    link: "https://covia.ai",
    category: "AI Infrastructure"
  },
  {
    title: "Paisley",
    description: "A membership-owned cooperative platform for freelancers and creatives building a better future for all.",
    image: "/images/paisley-logo.webp",
    link: "https://paisley.io",
    category: "Creator Economy"
  },
  {
    title: "European Union",
    description: "Part of the Next Generation Internet programme, focusing on efficient scalable DLT infrastructure and interoperable token exchange.",
    image: "/images/Europe.webp",
    link: "https://docs.convex.world/docs/products/tokengine",
    category: "Government"
  },
  {
    title: "Lumoza",
    description: "Transforming the music industry with solutions to help artists register and manage their copyrights.",
    image: "/images/lumoza.avif",
    link: "https://lumoza.io",
    category: "Music & IP"
  },
  {
    title: "ReMeLife",
    description: "The first AI-Web3 Care-2-Earn community ecosystem, building ReMeGrid—a decentralised rewards-based care community.",
    link: "https://remelife.com",
    image: "/images/remelife.webp",
    category: "Healthcare"
  }
];

const stats = [
  { value: "5+", label: "Active Projects" },
  { value: "3", label: "Continents" },
  { value: "∞", label: "Possibilities" }
];

export default function Ecosystem() {
  return (
    <main>
      {/* Lattice Background */}
      <div className="lattice-bg" aria-hidden="true">
        <div className="lattice-node lattice-node-1" />
        <div className="lattice-node lattice-node-2" />
        <div className="lattice-node lattice-node-3" />
      </div>

      {/* Hero Section */}
      <section className="eco-hero">
        <div className="hero-eyebrow">
          <div className="hero-label">Building on Convex</div>
        </div>
        <h1>
          The Convex{" "}
          <span className="hero-accent">Ecosystem</span>
        </h1>
        <p>
          Pioneering organizations and projects building the future of decentralized 
          systems with Convex and Lattice technology.
        </p>
      </section>

      {/* Stats */}
      <div className="eco-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="eco-stat">
            <span className="eco-stat-value">{stat.value}</span>
            <span className="eco-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Projects Grid */}
      <section className="eco-section">
        <div className="section-header">
          <span className="section-number">// 001</span>
          <h2>Featured Projects</h2>
          <p>Organizations leveraging Convex for real-world impact</p>
        </div>

        <div className="eco-grid">
          {ecosystemItems.map((item) => (
            <a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="eco-card"
            >
              <span className="eco-card-category">{item.category}</span>
              <div className="eco-card-image">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={120}
                    height={120}
                    style={{ objectFit: "contain" }}
                  />
                )}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="eco-card-link">
                <span>Visit project</span>
                <ArrowUpRight size={14} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Join Section */}
      <section className="eco-section">
        <div className="section-header">
          <span className="section-number">// 002</span>
          <h2>Join the Ecosystem</h2>
          <p>Build with us and be part of the next generation of decentralized systems</p>
        </div>

        <div className="eco-join-grid">
          <div className="eco-join-card">
            <div className="eco-join-icon">
              <Building2 size={24} strokeWidth={1.5} />
            </div>
            <h4>For Enterprises</h4>
            <p>Deploy production-ready solutions on Convex infrastructure.</p>
            <Link href="https://docs.convex.world" className="btn btn-secondary" target="_blank">
              Learn More
            </Link>
          </div>
          <div className="eco-join-card">
            <div className="eco-join-icon">
              <Users size={24} strokeWidth={1.5} />
            </div>
            <h4>For Developers</h4>
            <p>Start building with our comprehensive SDK and documentation.</p>
            <Link href="/developers" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
          <div className="eco-join-card">
            <div className="eco-join-icon">
              <Globe2 size={24} strokeWidth={1.5} />
            </div>
            <h4>For Communities</h4>
            <p>Join our Discord and connect with builders worldwide.</p>
            <Link href="https://discord.gg/xfYGq4CT7v" className="btn btn-secondary" target="_blank">
              Join Discord
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="eco-cta">
        <h3>Building on Convex?</h3>
        <p>
          If you&apos;re building on Convex and want to be featured here, 
          reach out and we&apos;ll add you to the ecosystem.
        </p>
        <Link href="https://discord.gg/xfYGq4CT7v" className="btn btn-primary" target="_blank">
          Get in Touch
        </Link>
      </section>

      <div className="geo-line" aria-hidden="true" />
    </main>
  );
}