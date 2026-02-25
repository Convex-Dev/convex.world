import Link from "next/link";
import Image from "next/image";
import Parser from "rss-parser";
import { ArrowUpRight, Calendar } from "lucide-react";
import ContentPage from "@/components/ContentPage";
import SectionHeader from "@/components/SectionHeader";
import StructuredData from "@/lib/structured-data";
import { socialLinks, FALLBACK_RECENT, type RecentItem } from "@/data/community-social";

export const metadata = {
  title: "Community",
  description: "Join the Convex community. Connect with builders, researchers, and pioneers shaping the future of decentralised coordination.",
};

const RSS_URL = "https://docs.convex.world/blog/rss.xml";

const contentTypeLabels = {
  blog: "Blog Post",
  announcement: "Announcement",
} as const;

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

export default async function Community() {
  const recentContent = await fetchRecentFromRss();
  const displayContent = recentContent.length > 0 ? recentContent : FALLBACK_RECENT;

  return (
    <ContentPage>
      <StructuredData type="WebPage" metadata={metadata} path="/community/" />
      {/* Hero + Social Links */}
      <section className="community-hero">
        <span className="dev-hero-tag">// Connect with us</span>
        <h1>
          Join the{" "}
          Community
        </h1>
        <p className="community-hero-text">Builders, researchers, dreamers, and pioneers from around the world are shaping the future of decentralised coordination.</p>
        <div className="community-social-row">
          {socialLinks.map((social) => (
            <a
              key={social.key}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`community-social-link community-social-${social.color}`}
              aria-label={social.name}
            >
              <Image
                src={social.logo}
                alt={social.name}
                width={32}
                height={32}
                style={{ objectFit: "contain" }}
                className={social.color === "twitter" ? "x-logo" : ""}
              />
            </a>
          ))}
        </div>
      </section>

      {/* Activity Timeline */}
      <section className="community-section">
        <SectionHeader title="Feed" subtitle="The latest from the Convex ecosystem" />
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
          <p>Whether you&apos;re a developer, researcher, or just curious about decentralised systems—there&apos;s a place for you here.</p>
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
    </ContentPage>
  );
}
