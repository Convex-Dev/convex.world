import { getHighlighter } from '@/lib/shiki';

interface CodeBlockProps {
  code: string;
  lang?: string;
  title?: string;
}

export default async function CodeBlock({ code, lang = 'clojure', title }: CodeBlockProps) {
  const highlighter = await getHighlighter();
  const html = highlighter.codeToHtml(code.trim(), {
    lang,
    themes: { dark: 'material-theme-ocean', light: 'catppuccin-latte' },
    defaultColor: false,
  });

  return (
    <div className="code-block">
      {title && <div className="code-block-title">{title}</div>}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
