import { setRequestLocale, getTranslations } from 'next-intl/server';
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
    key: "discord",
    logo: "/images/social_discord.webp",
    href: "https://discord.com/invite/xfYGq4CT7v",
    color: "discord"
  },
  {
    key: "youtube",
    logo: "/images/youtube.svg",
    href: "https://www.youtube.com/@convex-world",
    color: "youtube"
  },
  {
    key: "x",
    logo: "/images/x-logo.svg",
    href: "https://x.com/convex_world",
    color: "twitter"
  },
  {
    key: "blog",
    logo: "/images/convex-blue.svg",
    href: "https://docs.convex.world/blog",
    color: "blog"
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

const contentTypeKeys = {
  blog: "blogPost",
  video: "video",
  announcement: "announcement",
} as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Community({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('community');
  
  const recentContent = await fetchRecentFromRss();
  const displayContent = recentContent.length > 0 ? recentContent : FALLBACK_RECENT;
  
  return (
    <>
      {/* Lattice Background */}
      <div className="lattice-bg" aria-hidden="true">
        <div className="lattice-node lattice-node-1" />
        <div className="lattice-node lattice-node-2" />
        <div className="lattice-node lattice-node-3" />
      </div>

      {/* Hero Section */}
      <section className="community-hero">
        <div className="hero-eyebrow">
          <div className="hero-label">{t('hero.label')}</div>
        </div>
        <h1>
          {t('hero.title')}{" "}
          <span className="hero-accent">{t('hero.titleAccent')}</span>
        </h1>
        <p className="community-hero-text">{t('hero.subtitle')}</p>
      </section>

      {/* Social Links */}
      <section className="community-section">
        <div className="section-header">
          <span className="section-number">// {t('connect.number')}</span>
          <h2>{t('connect.title')}</h2>
          <p>{t('connect.subtitle')}</p>
        </div>

        <div className="community-social-grid">
          {socialLinks.map((social) => (
            <a
              key={social.key}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`community-social-card community-social-${social.color}`}
            >
              <div className="community-social-header">
                <div className="community-social-icon">
                  <Image 
                    src={social.logo} 
                    alt={t(`social.${social.key}.name`)}
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                    className={social.color === "twitter" ? "x-logo" : ""}
                  />
                </div>
                <h3>{t(`social.${social.key}.name`)}</h3>
              </div>
              <div className="community-social-content">
                <p>{t(`social.${social.key}.description`)}</p>
              </div>
              <div className="community-social-footer">
                <span>{t(`social.${social.key}.action`)}</span>
                <ArrowUpRight size={16} className="community-social-arrow" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Activity Timeline */}
      <section className="community-section">
        <div className="section-header">
          <span className="section-number">// {t('activity.number')}</span>
          <h2>{t('activity.title')}</h2>
          <p>{t('activity.subtitle')}</p>
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
                    {t(`contentTypes.${contentTypeKeys[item.type]}`)}
                  </span>
                  <span className="community-timeline-date">{item.date}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="community-timeline-footer">
                  <span className="community-timeline-author">{t('activity.by')} {item.author}</span>
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
            {t('activity.viewAll')}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* Community CTA */}
      <section className="community-cta">
        <div className="community-cta-content">
          <h3>{t('cta.title')}</h3>
          <p>{t('cta.description')}</p>
          <div className="community-cta-buttons">
            <Link 
              href="https://discord.com/invite/xfYGq4CT7v" 
              className="btn btn-primary"
              target="_blank"
            >
              {t('cta.discord')}
              <ArrowUpRight size={14} />
            </Link>
            <Link href="/developers" className="btn btn-secondary">
              {t('cta.build')}
            </Link>
          </div>
        </div>
      </section>

      <div className="geo-line" aria-hidden="true" />
    </>
  );
}
