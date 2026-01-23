import { setRequestLocale, getTranslations } from 'next-intl/server';
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Users, Building2, Globe2 } from "lucide-react";

const ecosystemItems = [
  {
    key: "covia",
    image: "/images/covia.webp",
    link: "https://covia.ai"
  },
  {
    key: "paisley",
    image: "/images/paisley-logo.webp",
    link: "https://paisley.io"
  },
  {
    key: "eu",
    image: "/images/Europe.webp",
    link: "https://docs.convex.world/docs/products/tokengine"
  },
  {
    key: "lumoza",
    image: "/images/lumoza.avif",
    link: "https://lumoza.io"
  },
  {
    key: "remelife",
    image: "/images/remelife.webp",
    link: "https://remelife.com"
  }
];


type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Ecosystem({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ecosystem');

  return (
    <>
      {/* Lattice Background */}
      <div className="lattice-bg" aria-hidden="true">
        <div className="lattice-node lattice-node-1" />
        <div className="lattice-node lattice-node-2" />
        <div className="lattice-node lattice-node-3" />
      </div>

      {/* Hero Section */}
      <section className="eco-hero">
        <div className="hero-eyebrow">
          <div className="hero-label">{t('hero.label')}</div>
        </div>
        <h1>
          {t('hero.title')}{" "}
          <span className="hero-accent">{t('hero.titleAccent')}</span>
        </h1>
        <p>{t('hero.subtitle')}</p>
      </section>

      {/* Stats */}
      <div className="eco-stats">
        <div className="eco-stat">
          <span className="eco-stat-value">{t('stats.projects.value')}</span>
          <span className="eco-stat-label">{t('stats.projects.label')}</span>
        </div>
        <div className="eco-stat">
          <span className="eco-stat-value">{t('stats.continents.value')}</span>
          <span className="eco-stat-label">{t('stats.continents.label')}</span>
        </div>
        <div className="eco-stat">
          <span className="eco-stat-value">{t('stats.possibilities.value')}</span>
          <span className="eco-stat-label">{t('stats.possibilities.label')}</span>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="eco-section">
        <div className="section-header">
          <span className="section-number">// {t('featured.number')}</span>
          <h2>{t('featured.title')}</h2>
          <p>{t('featured.subtitle')}</p>
        </div>

        <div className="eco-grid">
          {ecosystemItems.map((item) => (
            <a
              key={item.key}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="eco-card"
            >
              <span className="eco-card-category">{t(`projects.${item.key}.category`)}</span>
              <div className="eco-card-header">
                <div className="eco-card-image">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={t(`projects.${item.key}.title`)}
                      width={120}
                      height={120}
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </div>
                <h3>{t(`projects.${item.key}.title`)}</h3>
              </div>
              <p>{t(`projects.${item.key}.description`)}</p>
              <div className="eco-card-link">
                <span>{t('featured.visitProject')}</span>
                <ArrowUpRight size={14} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Join Section */}
      <section className="eco-section">
        <div className="section-header">
          <span className="section-number">// {t('join.number')}</span>
          <h2>{t('join.title')}</h2>
          <p>{t('join.subtitle')}</p>
        </div>

        <div className="eco-join-grid">
          <div className="eco-join-card">
            <div className="eco-join-icon">
              <Building2 size={24} strokeWidth={1.5} />
            </div>
            <h4>{t('join.enterprise.title')}</h4>
            <p>{t('join.enterprise.description')}</p>
            <Link href="https://docs.convex.world" className="btn btn-secondary" target="_blank">
              {t('join.enterprise.cta')}
            </Link>
          </div>
          <div className="eco-join-card">
            <div className="eco-join-icon">
              <Users size={24} strokeWidth={1.5} />
            </div>
            <h4>{t('join.developers.title')}</h4>
            <p>{t('join.developers.description')}</p>
            <Link href="/developers" className="btn btn-secondary">
              {t('join.developers.cta')}
            </Link>
          </div>
          <div className="eco-join-card">
            <div className="eco-join-icon">
              <Globe2 size={24} strokeWidth={1.5} />
            </div>
            <h4>{t('join.communities.title')}</h4>
            <p>{t('join.communities.description')}</p>
            <Link href="https://discord.gg/xfYGq4CT7v" className="btn btn-secondary" target="_blank">
              {t('join.communities.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="eco-cta">
        <h3>{t('cta.title')}</h3>
        <p>{t('cta.description')}</p>
        <Link href="https://discord.gg/xfYGq4CT7v" className="btn btn-primary" target="_blank">
          {t('cta.button')}
        </Link>
      </section>

      <div className="geo-line" aria-hidden="true" />
    </>
  );
}
