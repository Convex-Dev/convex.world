import Link from "next/link";
import Image from "next/image";
import Parser from "rss-parser";
import { ArrowUpRight, Calendar } from "lucide-react";

const RSS_URL = "https://docs.convex.world/blog/rss.xml";

type RecentItem = {
  type: "blog" | "announcement";
  title: string;
  description: string;
  date: string;
  author: string;
  href: string;
  tags: string[];
};

function formatPubDate(raw: string | undefined): string {
  if (!raw) return "";
  try {
    const d = new Date(raw);
    return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
  } catch {
    return raw;
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

async function fetchRecentFromRss(): Promise<RecentItem[]> {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const parser = new Parser();
    const feed = await parser.parseString(xml);
    return (feed.items ?? []).slice(0, 6).map((item) => {
      const link = item.link ?? item.guid ?? "#";
      const raw = item.contentSnippet ?? item.summary ?? (item as Record<string, unknown>).description;
      const desc = (typeof raw === "string" ? raw : item.content ? stripHtml(item.content) : "") || "";
      return {
        type: "blog" as const,
        title: item.title ?? "Untitled",
        description: desc.slice(0, 200) + (desc.length > 200 ? "…" : ""),
        date: formatPubDate(item.pubDate ?? item.isoDate),
        author: item.creator ?? "Convex",
        href: link,
        tags: item.categories ?? [],
      };
    });
  } catch {
    return [];
  }
}

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

const FALLBACK_RECENT: RecentItem[] = [
  {
    type: "blog",
    title: "AI Meets the Lattice",
    description: "A new era of autonomous economic agents. Manus AI demonstrates how AI can actively participate as an economic actor on Convex.",
    date: "Nov 2025",
    author: "Manus AI",
    href: "https://docs.convex.world/blog/ai-meets-convex",
    tags: ["AI", "MCP", "Digital Assets"],
  },
  {
    type: "blog",
    title: "Countdown to Protonet",
    description: "The groundbreaking Convex Protonet goes live. Everything you need to know about the launch.",
    date: "Nov 2024",
    author: "Convex",
    href: "https://docs.convex.world/blog/protonet-countdown",
    tags: ["Protonet", "Launch", "Lattice"],
  },
];

const contentTypeLabels = {
  blog: "Blog Post",
  video: "Video",
  announcement: "Announcement",
} as const;

export default async function Community() {
  const recentContent = await fetchRecentFromRss();
  const displayContent = recentContent.length > 0 ? recentContent : FALLBACK_RECENT;
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
          {displayContent.map((item, index) => (
            <a
              key={item.href + index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="community-timeline-item"
            >
              <div className="community-timeline-marker">
                <div className="community-timeline-dot" />
                {index < displayContent.length - 1 && (
                  <div className="community-timeline-line" />
                )}
              </div>
              <div className="community-timeline-content">
                <div className="community-timeline-meta">
                  <span className="community-timeline-type">
                    <Calendar size={12} />
                    {contentTypeLabels[item.type] ?? "Blog Post"}
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
