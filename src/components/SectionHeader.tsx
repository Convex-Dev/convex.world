import { ReactNode } from "react";

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: ReactNode;
}

export default function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <span className="section-number">// {number}</span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
