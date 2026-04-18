"use client";

import { useEffect } from "react";
import redirects, { prefixRedirects } from "@/data/redirects";

/**
 * Checks the current path against the redirect tables.
 *
 * First tries an exact match against {@link redirects} (paths normalised to
 * lowercase with no trailing slash). If that misses, tries a prefix match
 * against {@link prefixRedirects}, preserving the suffix path (case intact),
 * query string, and hash.
 */
export default function SmartRedirect() {
  useEffect(() => {
    const rawPath = window.location.pathname;
    const normalised = rawPath.replace(/\/+$/, "").toLowerCase();

    const exact = redirects[normalised];
    if (exact) {
      window.location.replace(exact);
      return;
    }

    for (const [prefix, target] of Object.entries(prefixRedirects)) {
      if (normalised === prefix || normalised.startsWith(prefix + "/")) {
        const suffix = rawPath.slice(prefix.length).replace(/^\/+/, "");
        const base = target.replace(/\/+$/, "");
        const url = `${base}/${suffix}${window.location.search}${window.location.hash}`;
        window.location.replace(url);
        return;
      }
    }
  }, []);

  return null;
}
