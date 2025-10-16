import FooterColumn from './footer/FooterColumn';
import FooterLink from './footer/FooterLink';
import { footerData } from './footer/footerData';

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <div>
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