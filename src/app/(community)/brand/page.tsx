import Link from "next/link";
import Image from "next/image";
import { Download, ArrowUpRight, FileImage, Palette, Type } from "lucide-react";
import ExtLink from "@/components/ExtLink";
import ContentPage from "@/components/ContentPage";
import SectionHeader from "@/components/SectionHeader";
import CtaSection from "@/components/CtaSection";
import StructuredData from "@/lib/structured-data";
import { logoAssets, brandColors, guidelines } from "@/data/brand-assets";

export const metadata = {
  title: "Brand Assets",
  description: "Official Convex logos, colours, typography, and brand guidelines for media, presentations, and partner materials.",
};

export default function Brand() {
  return (
    <ContentPage>
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
          Official logos, colours, and guidelines for representing Convex
          in media, presentations, and partner materials.
        </p>
      </section>

      {/* Logo Downloads */}
      <section className="brand-section">
        <SectionHeader number="001" title="Logo Assets" subtitle="Download official Convex logos in vector format" />
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
        <SectionHeader number="002" title="Brand Colours" subtitle="The official Convex colour palette" />
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
        <SectionHeader number="003" title="Usage Guidelines" subtitle="How to properly use Convex brand assets" />
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
        <SectionHeader number="004" title="Typography" subtitle="Fonts used across Convex properties" />
        <div className="brand-typography">
          <div className="brand-font-card">
            <div className="brand-font-icon">
              <Type size={24} />
            </div>
            <div className="brand-font-info">
              <h4>Inter</h4>
              <p>Primary typeface for all digital communications, UI, and body text.</p>
              <ExtLink
                href="https://fonts.google.com/specimen/Inter"
                className="brand-font-link"
              >
                Get from Google Fonts
                <ArrowUpRight size={14} />
              </ExtLink>
            </div>
          </div>
          <div className="brand-font-card">
            <div className="brand-font-icon">
              <Palette size={24} />
            </div>
            <div className="brand-font-info">
              <h4>JetBrains Mono</h4>
              <p>Monospace font for code samples, terminal output, and technical content.</p>
              <ExtLink
                href="https://fonts.google.com/specimen/JetBrains+Mono"
                className="brand-font-link"
              >
                Get from Google Fonts
                <ArrowUpRight size={14} />
              </ExtLink>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <CtaSection
        className="brand-cta"
        title="Need Something Specific?"
        description="For additional assets, custom formats, or press inquiries, reach out to us on Discord."
        links={[
          { label: "Contact on Discord", href: "https://discord.com/invite/xfYGq4CT7v", external: true },
          { label: "Community Hub", href: "/community", variant: "secondary" },
        ]}
      />
      <StructuredData type="WebPage" metadata={metadata} path="/brand/" />
    </ContentPage>
  );
}
