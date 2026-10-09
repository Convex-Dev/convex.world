export interface LogoAsset {
  name: string;
  filename: string;
  path: string;
  format: string;
  usage: string;
}

export const logoAssets: LogoAsset[] = [
  {
    name: "Logo (Dark Blue)",
    filename: "logo_dark_blue.svg",
    path: "/images/logo_dark_blue.svg",
    format: "SVG (bitmap)",
    usage: "Primary logo for light backgrounds",
  },
  {
    name: "Logo Mark (Blue)",
    filename: "convex-blue.svg",
    path: "/images/convex-blue.svg",
    format: "SVG",
    usage: "Icon/mark for compact spaces",
  },
  {
    name: "Logo Mark",
    filename: "convex.svg",
    path: "/images/convex.svg",
    format: "SVG",
    usage: "Monochrome logo mark",
  },
];

export interface BrandColor {
  name: string;
  hex: string;
  usage: string;
}

export const brandColors: BrandColor[] = [
  { name: "Medium Blue", hex: "#416BA9", usage: "Primary brand colour (PANTONE 7683 C)" },
  { name: "Dark Blue", hex: "#0F206C", usage: "Deep accents and backgrounds (PANTONE 2756 C)" },
  { name: "Sky Blue", hex: "#6AAAEE", usage: "Highlights and links (PANTONE 284 C)" },
  { name: "Light Blue", hex: "#B8D8EB", usage: "Soft accents (PANTONE 290 C)" },
  { name: "Juice Yellow", hex: "#E0CC00", usage: "Compute and juice indicators" },
];

export interface BrandGuideline {
  title: string;
  description: string;
}

export const guidelines: BrandGuideline[] = [
  {
    title: "Clear Space",
    description: "Maintain minimum clear space around the logo equal to the height of the 'C' in Convex.",
  },
  {
    title: "Minimum Size",
    description: "Logo should never appear smaller than 80px wide for digital or 20mm for print.",
  },
  {
    title: "Background Usage",
    description: "Use the dark logo on light backgrounds and light logo on dark backgrounds for optimal contrast.",
  },
  {
    title: "No Modifications",
    description: "Do not stretch, rotate, add effects, or alter the logo colours outside of approved variants.",
  },
];
