import type { HTMLAttributes, ReactNode } from "react";

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  children: ReactNode;
}

/** Standard vertical content section used by content-led pages. */
export default function Section({ children, className, ...props }: SectionProps) {
  const classes = className ? `content-section ${className}` : "content-section";

  return (
    <section className={classes} {...props}>
      {children}
    </section>
  );
}
