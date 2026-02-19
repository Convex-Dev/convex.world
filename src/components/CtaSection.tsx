import { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CtaLink {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
}

interface CtaSectionProps {
  className: string;
  title: string;
  description: string;
  links: CtaLink[];
  heading?: "h2" | "h3";
  children?: ReactNode;
}

export default function CtaSection({ className, title, description, links, heading = "h3", children }: CtaSectionProps) {
  const Heading = heading;
  return (
    <section className={className}>
      <Heading>{title}</Heading>
      <p>{description}</p>
      <div className="btn-group">
        {links.map((link) => {
          const cls = `btn btn-${link.variant ?? "primary"}`;
          return link.external ? (
            <Link key={link.href} href={link.href} className={cls} target="_blank">
              {link.label}
              <ArrowUpRight size={14} />
            </Link>
          ) : (
            <Link key={link.href} href={link.href} className={cls}>
              {link.label}
            </Link>
          );
        })}
      </div>
      {children}
    </section>
  );
}
