import { ReactNode } from "react";
import ContentPage from "@/components/ContentPage";

interface Highlight {
  label: string;
  value: string;
}

interface SuperpowerPageProps {
  tag: string;
  title: ReactNode;
  description: string;
  visual?: ReactNode;
  highlights?: Highlight[];
  children: ReactNode;
}

export default function SuperpowerPage({ tag, title, description, visual, highlights, children }: SuperpowerPageProps) {
  return (
    <ContentPage>
      <section className="vision-hero">
        <div className="vision-hero-content">
          <span className="dev-hero-tag">{tag}</span>
          <h1>{title}</h1>
          <p className="vision-hero-text">{description}</p>
          {highlights && (
            <div className="vision-hero-highlights">
              {highlights.map((h) => (
                <div key={h.label} className="vision-hero-highlight">
                  <span className="vision-hero-highlight-value">{h.value}</span>
                  <span className="vision-hero-highlight-label">{h.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {visual}
      </section>
      {children}
    </ContentPage>
  );
}
