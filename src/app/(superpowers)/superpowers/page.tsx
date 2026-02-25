import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import StructuredData from "@/lib/structured-data";
import { superpowers } from "@/data/superpowers";

export const metadata: Metadata = {
  title: "Superpowers — Convex",
  description:
    "The full set of Convex superpowers: lattice technology, convergent consensus, smart economy, decentralised identity, and more.",
};

const categories: Record<string, string> = {
  overview: "Overview",
  infrastructure: "Core Infrastructure",
  economy: "Smart Economy",
  platform: "Platform",
};

/**
 * Superpowers index — a structured summary of all Convex superpowers.
 * Primarily for search engines and AI agents, not linked from main navigation.
 */
export default function SuperpowersIndex() {
  const grouped = Object.keys(categories).map((cat) => ({
    category: cat,
    label: categories[cat],
    items: superpowers.filter((sp) => sp.category === cat),
  }));

  return (
    <ContentPage>
      <article className="content-section">
        <h1>Convex Superpowers</h1>
        <p>
          Convex combines a unique set of capabilities — superpowers — that together
          enable a new kind of decentralised platform for the agentic economy.
        </p>

        {grouped.map(({ category, label, items }) => (
          <section key={category}>
            <h2>{label}</h2>
            <div className="superpower-docs-grid">
              {items.map((sp) => {
                const isExternal = sp.external || sp.href.startsWith("http");
                return isExternal ? (
                  <a
                    key={sp.href}
                    href={sp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="superpower-doc-card"
                  >
                    <span className="superpower-doc-label">{sp.title}</span>
                    <span className="superpower-doc-desc">{sp.desc}</span>
                  </a>
                ) : (
                  <Link key={sp.href} href={sp.href} className="superpower-doc-card">
                    <span className="superpower-doc-label">{sp.title}</span>
                    <span className="superpower-doc-desc">{sp.desc}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </article>
      <StructuredData type="WebPage" metadata={metadata} path="/superpowers/" />
    </ContentPage>
  );
}
