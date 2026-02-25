import { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import ContentPage from "@/components/ContentPage";
import StructuredData from "@/lib/structured-data";
import { getSuperpowerMetadata, getSuperpowerPage, buildHeroTitle } from "@/data/superpower-metadata";

interface SuperpowerPageProps {
  href: string;
  visual?: ReactNode;
  children: ReactNode;
}

export default function SuperpowerPage({ href, visual, children }: SuperpowerPageProps) {
  const metadata = getSuperpowerMetadata(href);
  const page = getSuperpowerPage(href);

  return (
    <ContentPage>
      <StructuredData type="WebPage" metadata={metadata} path={`${href}/`} />
      <section className="vision-hero">
        <div className="vision-hero-content">
          <span className="dev-hero-tag">{page.tag}</span>
          <h1>{buildHeroTitle(page)}</h1>
          <p className="vision-hero-text">{page.description}</p>
          {page.highlights.length > 0 && (
            <div className="vision-hero-highlights">
              {page.highlights.map((h) => (
                <div key={h.label} className="vision-hero-highlight">
                  <span className="vision-hero-highlight-value">{h.value}</span>
                  <span className="vision-hero-highlight-label">{h.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {visual}
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
