interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

export default function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {children}
      </ul>
    </div>
  );
} 