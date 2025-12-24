import Image from 'next/image';

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerData: FooterColumn[] = [
  {
    title: "Documentation",
    links: [
      { text: "Introduction", href: "https://docs.convex.world/docs/intro" },
      { text: "Whitepaper", href: "https://docs.convex.world/docs/overview/convex-whitepaper" },
      { text: "Core Concepts", href: "https://docs.convex.world/docs/overview/concepts" },
      { text: "Tutorials", href: "https://docs.convex.world/docs/tutorial/coins" },
      { text: "API Reference", href: "http://peer.convex.live:8080/swagger" }
    ]
  },
  {
    title: "Community",
    links: [
      { text: "Discord", href: "https://discord.com/invite/xfYGq4CT7v" },
      { text: "GitHub", href: "https://github.com/Convex-Dev" },
      { text: "Twitter", href: "https://twitter.com/convex_world" }
    ]
  },
  {
    title: "Resources",
    links: [
      { text: "Blog", href: "https://docs.convex.world/blog" },
      { text: "Ecosystem", href: "https://docs.convex.world/docs/ecosystem" },
      { text: "Report an Issue", href: "https://github.com/Convex-Dev/convex.world/issues" },
      { text: "Contribute", href: "https://docs.convex.world/docs/contributing" }
    ]
  }
];

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-grid">
          {footerData.map((column) => (
            <div key={column.title} className="footer-column">
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>Convex Foundation. Building infrastructure for intelligent economies.</p>
        </div>
      </div>
    </footer>
  );
}