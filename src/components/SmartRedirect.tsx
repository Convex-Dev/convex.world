"use client";

import { useEffect } from "react";
import redirects from "@/data/redirects";

/**
 * Checks the current path against the redirect table.
 * If matched, navigates immediately. Normalises to lowercase with no trailing slash.
 */
export default function SmartRedirect() {
  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, "").toLowerCase();
    const target = redirects[path];
    if (target) {
      window.location.replace(target);
    }
  }, []);

  return null;
}
