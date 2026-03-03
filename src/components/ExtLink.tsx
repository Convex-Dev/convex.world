import { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Named window targets for external links, grouped by destination.
 * Reuses the same tab per domain group instead of spawning a new tab every click.
 */
function targetForHref(href: string): string {
  try {
    const host = new URL(href).hostname;
    if (host.endsWith("docs.convex.world")) return "docs";
    if (host.endsWith("github.com")) return "github";
    if (host.endsWith("discord.com") || host.endsWith("discord.gg")) return "community";
    if (host.endsWith("twitter.com") || host.endsWith("x.com")) return "social";
    if (host.endsWith("youtube.com")) return "social";
    if (host.endsWith("stackoverflow.com")) return "social";
    if (host.endsWith("convex.live") || host.endsWith("hf.space")) return "convex";
    if (host.endsWith("docker.com")) return "tools";
    if (host.endsWith("maven.org")) return "tools";
  } catch {
    /* malformed URL — fall through */
  }
  return "_blank";
}

interface ExtLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

/**
 * External link with automatic named-target detection and security attributes.
 * Use this for all links that leave convex.world.
 */
export default function ExtLink({ href, children, ...rest }: ExtLinkProps) {
  const target = targetForHref(href);
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}
