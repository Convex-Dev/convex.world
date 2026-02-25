import { createHighlighter, type Highlighter } from 'shiki';

let highlighter: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = createHighlighter({
      langs: ['clojure', 'typescript', 'bash'],
      themes: ['material-theme-ocean', 'catppuccin-latte'],
    });
  }
  return highlighter;
}
