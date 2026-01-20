import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar } from "lucide-react";

const socialLinks = [
  {
    name: "Discord",
    description: "Join the conversation with builders, researchers, and enthusiasts.",
    logo: "/images/social_discord.webp",
    href: "https://discord.com/invite/xfYGq4CT7v",
    color: "discord",
    action: "Join"
  },
  {
    name: "YouTube",
    description: "Watch tutorials, demos, and deep dives into Convex technology.",
    logo: "/images/youtube.svg",
    href: "https://www.youtube.com/@convex-world",
    color: "youtube",
    action: "Visit"
  },
  {
    name: "X",
    description: "Follow for the latest updates, announcements, and community highlights.",
    logo: "/images/x-logo.svg",
    href: "https://x.com/convex_world",
    color: "twitter",
    action: "Explore"
  },
  {
    name: "Blog",
    description: "In-depth articles on technology, roadmap, and ecosystem developments.",
    logo: "/images/convex-blue.svg",
    href: "https://docs.convex.world/blog",
    color: "blog",
    action: "Read"
  }
] as const;

const recentContent = [
  {
    type: "blog" as const,
    title: "AI Meets the Lattice",
    description: "A new era of autonomous economic agents. Manus AI demonstrates how AI can actively participate as an economic actor on Convex.",
    date: "2025",
    author: "Manus AI",
    href: "https://docs.convex.world/blog/ai-meets-convex",
    tags: ["AI", "MCP", "Digital Assets"]
  },
  {
    type: "blog" as const,
    title: "Countdown to Protonet",
    description: "The groundbreaking Convex Protonet goes live. Everything you need to know about the launch of the world's most powerful platform for decentralised economic systems.",
    date: "December 2024",
    author: "Mike Anderson",
    href: "https://docs.convex.world/blog/protonet-countdown",
    tags: ["Protonet", "Launch", "Lattice"]
  },
  {
    type: "blog" as const,
    title: "The CAD3 Revolution",
    description: "Understanding CAD3 encoding—the last significant piece needed before Protonet goes live.",
    date: "2024",
    author: "Mike Anderson",
    href: "https://docs.convex.world/blog/cad3-revolution",
    tags: ["CAD3", "Technical"]
  },
  {
    type: "blog" as const,
    title: "Reader Upgrades",
    description: "The Reader converts text into data. Final touches on this key component for Convex-based apps.",
    date: "2024",
    author: "Mike Anderson",
    href: "https://docs.convex.world/blog/tagged-values",
    tags: ["Reader", "Lisp", "Technical"]
  },
  {
    type: "announcement" as const,
    title: "New Documentation Site",
    description: "A comprehensive new documentation site powered by Docusaurus, making it easier than ever to learn and build with Convex.",
    date: "2024",
    author: "Mike Anderson",
    href: "https://docs.convex.world/blog/first-blog-post",
    tags: ["Docs", "Community"]
  }
];

const contentTypeLabels = {
  blog: "Blog Post",
  video: "Video",
  announcement: "Announcement"
} as const;

export default function Community() {
  return (
    <main>
      {/* Lattice Background */}
      <div className="lattice-bg" aria-hidden="true">
        <div className="lattice-node lattice-node-1" />
        <div className="lattice-node lattice-node-2" />
        <div className="lattice-node lattice-node-3" />
      </div>

      {/* Hero Section */}
      <section className="community-hero">
        <div className="hero-eyebrow">
          <div className="hero-label">The Heart of Convex</div>
        </div>
        <h1>
          Join the{" "}
          <span className="hero-accent">Community</span>
        </h1>
        <p className="community-hero-text">
          Convex isn&apos;t just technology—it&apos;s an open-source movement. Builders, researchers, 
          dreamers, and pioneers from around the world are shaping the future of 
          decentralised coordination.
        </p>
      </section>

      {/* Social Links */}
      <section className="community-section">
        <div className="section-header">
          <span className="section-number">// 001</span>
          <h2>Connect With Us</h2>
          <p>Find your place in the Convex community</p>
        </div>

        <div className="community-social-grid">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`community-social-card community-social-${social.color}`}
            >
              <div className="community-social-header">
                <div className="community-social-icon">
                  <Image 
                    src={social.logo} 
                    alt={social.name}
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                    className={social.color === "twitter" ? "x-logo" : ""}
                  />
                </div>
                <h3>{social.name}</h3>
              </div>
              <div className="community-social-content">
                <p>{social.description}</p>
              </div>
              <div className="community-social-footer">
                <span>{social.action}</span>
                <ArrowUpRight size={16} className="community-social-arrow" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Activity Timeline */}
      <section className="community-section">
        <div className="section-header">
          <span className="section-number">// 002</span>
          <h2>Recent Activity</h2>
          <p>The latest from the Convex ecosystem</p>
        </div>

        <div className="community-timeline">
          {recentContent.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="community-timeline-item"
            >
              <div className="community-timeline-marker">
                <div className="community-timeline-dot" />
                {index < recentContent.length - 1 && (
                  <div className="community-timeline-line" />
                )}
              </div>
              <div className="community-timeline-content">
                <div className="community-timeline-meta">
                  <span className="community-timeline-type">
                    <Calendar size={12} />
                    {contentTypeLabels[item.type]}
                  </span>
                  <span className="community-timeline-date">{item.date}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="community-timeline-footer">
                  <span className="community-timeline-author">By {item.author}</span>
                  <div className="community-timeline-tags">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="community-timeline-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <ArrowUpRight size={16} className="community-timeline-arrow" />
            </a>
          ))}
        </div>

        <div className="community-more">
          <Link 
            href="https://docs.convex.world/blog" 
            className="btn btn-secondary"
            target="_blank"
          >
            View All Posts
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* Community CTA */}
      <section className="community-cta">
        <div className="community-cta-content">
          <h3>Ready to Build the Future?</h3>
          <p>
            Whether you&apos;re a developer, researcher, or just curious about 
            decentralised systems—there&apos;s a place for you here.
          </p>
          <div className="community-cta-buttons">
            <Link 
              href="https://discord.com/invite/xfYGq4CT7v" 
              className="btn btn-primary"
              target="_blank"
            >
              Join Discord
              <ArrowUpRight size={14} />
            </Link>
            <Link href="/developers" className="btn btn-secondary">
              Start Building
            </Link>
          </div>
        </div>
      </section>

      <div className="geo-line" aria-hidden="true" />
    </main>
  );
}
