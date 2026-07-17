import type { ReactNode } from "react";

interface PageHeroProps {
  className?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
}

/** Shared semantic structure for compact content-page heroes. */
export default function PageHero({ className = "page-hero", eyebrow, title, children }: PageHeroProps) {
  return (
    <section className={className}>
      {eyebrow && <span className="dev-hero-tag">{eyebrow}</span>}
      <h1 className="page-hero-title">{title}</h1>
      {children}
    </section>
  );
}
