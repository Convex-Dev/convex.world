export interface Highlight {
  label: string;
  value: string;
}

interface HighlightsProps {
  items: Highlight[];
}

export default function Highlights({ items }: HighlightsProps) {
  if (items.length === 0) return null;
  return (
    <div className="vision-hero-highlights">
      {items.map((h) => (
        <div key={h.label} className="vision-hero-highlight">
          <span className="vision-hero-highlight-value">{h.value}</span>
          <span className="vision-hero-highlight-label">{h.label}</span>
        </div>
      ))}
    </div>
  );
}
