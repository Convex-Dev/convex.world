import Link from "next/link";
import Image from "next/image";
import { Download, ArrowUpRight, FileImage, Palette, Type } from "lucide-react";

const logoAssets = [
  {
    name: "Logo (Dark Blue)",
    filename: "logo_dark_blue.svg",
    path: "/images/logo_dark_blue.svg",
    format: "SVG",
    usage: "Primary logo for light backgrounds"
  },
  {
    name: "Logo Mark (Blue)",
    filename: "convex-blue.svg",
    path: "/images/convex-blue.svg",
    format: "SVG",
    usage: "Icon/mark for compact spaces"
  },
  {
    name: "Logo Mark",
    filename: "convex.svg",
    path: "/images/convex.svg",
    format: "SVG",
    usage: "Monochrome logo mark"
  }
];

const brandColors = [
  { name: "Convex Blue", hex: "#0066FF", usage: "Primary brand color" },
  { name: "Deep Blue", hex: "#001133", usage: "Dark backgrounds, text" },
  { name: "Electric Cyan", hex: "#00D4FF", usage: "Accent, highlights" },
  { name: "Lattice Purple", hex: "#7B61FF", usage: "Secondary accent" },
  { name: "Success Green", hex: "#00FF88", usage: "Positive states" }
];

const guidelines = [
  {
    title: "Clear Space",
    description: "Maintain minimum clear space around the logo equal to the height of the 'C' in Convex."
  },
  {
    title: "Minimum Size",
    description: "Logo should never appear smaller than 80px wide for digital or 20mm for print."
  },
  {
    title: "Background Usage",
    description: "Use the dark logo on light backgrounds and light logo on dark backgrounds for optimal contrast."
  },
  {
    title: "No Modifications",
    description: "Do not stretch, rotate, add effects, or alter the logo colors outside of approved variants."
  }
];

export default function Brand() {
  return (
    <main>
      {/* Lattice Background */}
      <div className="lattice-bg" aria-hidden="true">
        <div className="lattice-node lattice-node-1" />
        <div className="lattice-node lattice-node-2" />
        <div className="lattice-node lattice-node-3" />
      </div>

      {/* Hero Section */}
      <section className="brand-hero">
        <div className="hero-eyebrow">
          <div className="hero-label">Press &amp; Brand</div>
        </div>
        <h1>
          Brand{" "}
          <span className="hero-accent">Assets</span>
        </h1>
        <p>
          Official logos, colors, and guidelines for representing Convex 
          in media, presentations, and partner materials.
        </p>
      </section>

      {/* Logo Downloads */}
      <section className="brand-section">
        <div className="section-header">
          <span className="section-number">// 001</span>
          <h2>Logo Assets</h2>
          <p>Download official Convex logos in vector format</p>
        </div>

        <div className="brand-logo-grid">
          {logoAssets.map((asset) => (
            <div key={asset.name} className="brand-logo-card">
              <div className="brand-logo-preview">
                <Image
                  src={asset.path}
                  alt={asset.name}
                  width={200}
                  height={60}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="brand-logo-info">
                <h3>{asset.name}</h3>
                <p>{asset.usage}</p>
                <div className="brand-logo-meta">
                  <span className="brand-format">
                    <FileImage size={14} />
                    {asset.format}
                  </span>
                  <a
                    href={asset.path}
                    download={asset.filename}
                    className="brand-download"
                  >
                    <Download size={14} />
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Colors */}
      <section className="brand-section">
        <div className="section-header">
          <span className="section-number">// 002</span>
          <h2>Brand Colors</h2>
          <p>The official Convex color palette</p>
        </div>

        <div className="brand-colors-grid">
          {brandColors.map((color) => (
            <div key={color.name} className="brand-color-card">
              <div 
                className="brand-color-swatch"
                style={{ backgroundColor: color.hex }}
              />
              <div className="brand-color-info">
                <h4>{color.name}</h4>
                <code>{color.hex}</code>
                <p>{color.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="brand-section">
        <div className="section-header">
          <span className="section-number">// 003</span>
          <h2>Usage Guidelines</h2>
          <p>How to properly use Convex brand assets</p>
        </div>

        <div className="brand-guidelines-grid">
          {guidelines.map((guideline, index) => (
            <div key={guideline.title} className="brand-guideline-card">
              <span className="brand-guideline-number">0{index + 1}</span>
              <h4>{guideline.title}</h4>
              <p>{guideline.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="brand-section">
        <div className="section-header">
          <span className="section-number">// 004</span>
          <h2>Typography</h2>
          <p>Fonts used across Convex properties</p>
        </div>

        <div className="brand-typography">
          <div className="brand-font-card">
            <div className="brand-font-icon">
              <Type size={24} />
            </div>
            <div className="brand-font-info">
              <h4>Inter</h4>
              <p>Primary typeface for all digital communications, UI, and body text.</p>
              <a 
                href="https://fonts.google.com/specimen/Inter" 
                target="_blank" 
                rel="noopener noreferrer"
                className="brand-font-link"
              >
                Get from Google Fonts
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <div className="brand-font-card">
            <div className="brand-font-icon">
              <Palette size={24} />
            </div>
            <div className="brand-font-info">
              <h4>JetBrains Mono</h4>
              <p>Monospace font for code samples, terminal output, and technical content.</p>
              <a 
                href="https://fonts.google.com/specimen/JetBrains+Mono" 
                target="_blank" 
                rel="noopener noreferrer"
                className="brand-font-link"
              >
                Get from Google Fonts
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="brand-cta">
        <h3>Need Something Specific?</h3>
        <p>
          For additional assets, custom formats, or press inquiries, 
          reach out to us on Discord.
        </p>
        <div className="btn-group">
          <Link 
            href="https://discord.com/invite/xfYGq4CT7v" 
            className="btn btn-primary"
            target="_blank"
          >
            Contact on Discord
            <ArrowUpRight size={14} />
          </Link>
          <Link href="/community" className="btn btn-secondary">
            Community Hub
          </Link>
        </div>
      </section>

      <div className="geo-line" aria-hidden="true" />
    </main>
  );
}
