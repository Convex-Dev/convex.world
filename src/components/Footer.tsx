'use client';

import { useTranslations } from 'next-intl';

interface FooterLink {
  textKey: string;
  href: string;
}

interface FooterColumn {
  titleKey: string;
  links: FooterLink[];
}

const footerData: FooterColumn[] = [
  {
    titleKey: "documentation",
    links: [
      { textKey: "introduction", href: "https://docs.convex.world/docs/intro" },
      { textKey: "whitepaper", href: "https://docs.convex.world/docs/overview/convex-whitepaper" },
      { textKey: "coreConcepts", href: "https://docs.convex.world/docs/overview/concepts" },
      { textKey: "tutorials", href: "https://docs.convex.world/docs/tutorial/coins" },
      { textKey: "apiReference", href: "http://peer.convex.live:8080/swagger" }
    ]
  },
  {
    titleKey: "participate",
    links: [
      { textKey: "discord", href: "https://discord.com/invite/xfYGq4CT7v" },
      { textKey: "github", href: "https://github.com/Convex-Dev" },
      { textKey: "twitter", href: "https://twitter.com/convex_world" }
    ]
  },
  {
    titleKey: "resources",
    links: [
      { textKey: "blog", href: "https://docs.convex.world/blog" },
      { textKey: "ecosystem", href: "https://docs.convex.world/docs/ecosystem" },
      { textKey: "brandAssets", href: "/brand" },
      { textKey: "reportIssue", href: "https://github.com/Convex-Dev/convex.world/issues" }
    ]
  }
];

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer>
      <div className="footer-content">
        {/* Network Status Strip */}
        <div className="footer-status">
          <div className="status-item">
            <span className="status-indicator status-live" />
            <span className="status-label">{t('status.network')}</span>
            <span className="status-value">{t('status.operational')}</span>
          </div>
          <div className="status-item">
            <span className="status-label">{t('status.protocol')}</span>
            <span className="status-value">v0.7.14</span>
          </div>
        </div>

        <div className="footer-grid">
          {footerData.map((column) => (
            <div key={column.titleKey} className="footer-column">
              <h3>{t(`columns.${column.titleKey}`)}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {t(`links.${link.textKey}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>{t('tagline')}</p>
        </div>
      </div>
    </footer>
  );
}