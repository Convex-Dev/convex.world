import { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Named window targets for external links, grouped by destination.
 * Reuses the same tab per domain group instead of spawning a new tab every click.
 */
function targetForHref(href: string): string {
  try {
    const host = new URL(href).hostname;
    if (host.endsWith("docs.convex.world")) return "_docs";
    if (host.endsWith("github.com")) return "_github";
    if (host.endsWith("discord.com") || host.endsWith("discord.gg")) return "_community";
    if (host.endsWith("twitter.com") || host.endsWith("x.com")) return "_social";
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
  return (
    <a
      href={href}
      target={targetForHref(href)}
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
}
