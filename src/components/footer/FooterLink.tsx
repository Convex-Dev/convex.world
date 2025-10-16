import Image from 'next/image';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: {
    src: string;
    alt: string;
  };
}

export default function FooterLink({ href, children, icon }: FooterLinkProps) {
  return (
    <li>
      <a href={href}>
        {children}
        {icon && (
          <Image 
            src={icon.src}
            alt={icon.alt}
            width={16}
            height={16}
          />
        )}
      </a>
    </li>
  );
} 