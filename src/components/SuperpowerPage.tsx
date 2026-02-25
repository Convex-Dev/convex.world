import { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import ContentPage from "@/components/ContentPage";
import StructuredData from "@/lib/structured-data";
import Highlights from "@/components/Highlights";
import { getSuperpowerMetadata, getSuperpowerPage, buildHeroTitle } from "@/data/superpower-metadata";

interface SuperpowerPageProps {
  href: string;
  visual?: ReactNode;
  /** Rendered below the hero description. Defaults to the highlights grid from superpowers.json. */
  heroMeta?: ReactNode;
  /** Rich content panel displayed below heroMeta (or the default highlights). */
  heroContent?: ReactNode;
  children: ReactNode;
}

export default function SuperpowerPage({ href, visual, heroMeta, heroContent, children }: SuperpowerPageProps) {
  const metadata = getSuperpowerMetadata(href);
  const page = getSuperpowerPage(href);

  const defaultMeta = <Highlights items={page.highlights} />;

  return (
    <ContentPage>
      <StructuredData type="WebPage" metadata={metadata} path={`${href}/`} />
      <section className="vision-hero">
        <span className="dev-hero-tag">{page.tag}</span>
        <div className="vision-hero-content">
          <h1>{buildHeroTitle(page)}</h1>
          <p className="vision-hero-text">{page.description}</p>
          {heroMeta !== undefined ? heroMeta : defaultMeta}
        </div>
        {(visual || heroContent) && (
          <div className="vision-hero-right">
            {visual}
            {heroContent && <div className="vision-hero-panel">{heroContent}</div>}
          </div>
        )}
      </section>
      {children}
      {page.docs && page.docs.length > 0 && (
        <section className="vision-section superpower-docs">
          <div className="superpower-docs-header">
            <BookOpen size={20} strokeWidth={1.5} />
            <h2>Documentation &amp; References</h2>
          </div>
          <div className="superpower-docs-grid">
            {page.docs.map((doc) => (
              <Link key={doc.href} href={doc.href} className="superpower-doc-card" target="_blank" rel="noopener noreferrer">
                <span className="superpower-doc-label">
                  {doc.label}
                  <ArrowUpRight size={14} />
                </span>
                {doc.description && <span className="superpower-doc-desc">{doc.description}</span>}
              </Link>
            ))}
          </div>
        </section>
      )}
    </ContentPage>
  );
}
