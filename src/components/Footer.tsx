import FooterColumn from './footer/FooterColumn';
import FooterLink from './footer/FooterLink';
import { footerData } from './footer/footerData';

export default function Footer() {
  return (
    <footer className="bg-convex-dark-blue py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FooterColumn title={footerData.documentation.title}>
            {footerData.documentation.links.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.text}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={footerData.community.title}>
            {footerData.community.links.map((link) => (
              <FooterLink 
                key={link.href} 
                href={link.href} 
                icon={link.icon}
              >
                {link.text}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={footerData.resources.title}>
            {footerData.resources.links.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.text}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>
      </div>
    </footer>
  );
} 