import type { Metadata } from "next";
import type { ReactNode } from "react";
import superpowers from "./superpowers.json";

type SuperpowerEntry = (typeof superpowers)[number];

export interface SuperpowerPage {
  tag: string;
  heroTitle: string;
  heroAccent?: string;
  description: string;
  highlights: { label: string; value: string }[];
}

/**
 * Look up Next.js page metadata for an internal superpower page by its href.
 * Falls back to the entry's title and desc if no metadata field is present.
 */
export function getSuperpowerMetadata(href: string): Metadata {
  const entry = superpowers.find((sp: SuperpowerEntry) => sp.href === href);
  if (!entry) throw new Error(`No superpower entry for href "${href}"`);
  if ("metadata" in entry && entry.metadata) {
    return entry.metadata as Metadata;
  }
  return { title: entry.title, description: entry.desc };
}

/**
 * Look up hero-level page content for an internal superpower page.
 * Returns tag, title parts, description, and highlights from superpowers.json.
 */
export function getSuperpowerPage(href: string): SuperpowerPage {
  const entry = superpowers.find((sp: SuperpowerEntry) => sp.href === href);
  if (!entry || !("page" in entry) || !entry.page) {
    throw new Error(`No superpower page data for href "${href}"`);
  }
  return entry.page as SuperpowerPage;
}

/**
 * Build the hero title JSX from a SuperpowerPage's heroTitle and optional heroAccent.
 * If heroAccent is present, renders: heroTitle <br/> <span class="hero-accent">heroAccent</span>
 * Otherwise returns heroTitle as a plain string.
 */
export function buildHeroTitle(page: SuperpowerPage): ReactNode {
  if (!page.heroAccent) return page.heroTitle;
  return (
    <>
      {page.heroTitle}
      <br />
      <span className="hero-accent">{page.heroAccent}</span>
    </>
  );
}
