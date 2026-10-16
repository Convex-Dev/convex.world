/** Brand files live in public/brand/; every logo is offered as SVG and as a transparent PNG. */
export interface LogoAsset {
  name: string;
  svg: string;
  png: string;
  /** The background the asset is designed for, used for its preview. */
  background: "light" | "dark";
  usage: string;
}

export const logoAssets: LogoAsset[] = [
  {
    name: "Logo (Dark Blue)",
    svg: "/brand/convex-logo-dark-blue.svg",
    png: "/brand/convex-logo-dark-blue.png",
    background: "light",
    usage: "Primary logo for light backgrounds",
  },
  {
    name: "Logo (White)",
    svg: "/brand/convex-logo-white.svg",
    png: "/brand/convex-logo-white.png",
    background: "dark",
    usage: "Primary logo for dark backgrounds",
  },
  {
    name: "Logo (Colour)",
    svg: "/brand/convex-logo-colour.svg",
    png: "/brand/convex-logo-colour.png",
    background: "dark",
    usage: "Full-colour logo for dark backgrounds",
  },
  {
    name: "Stacked Logo (Dark Blue)",
    svg: "/brand/convex-logo-stacked-dark-blue.svg",
    png: "/brand/convex-logo-stacked-dark-blue.png",
    background: "light",
    usage: "Stacked layout for square or narrow spaces on light backgrounds",
  },
  {
    name: "Mark (Dark Blue)",
    svg: "/brand/convex-mark-dark-blue.svg",
    png: "/brand/convex-mark-dark-blue.png",
    background: "light",
    usage: "The hexagon on its own, for compact spaces on light backgrounds",
  },
  {
    name: "Mark (White)",
    svg: "/brand/convex-mark-white.svg",
    png: "/brand/convex-mark-white.png",
    background: "dark",
    usage: "The hexagon on its own, for compact spaces on dark backgrounds",
  },
  {
    name: "Mark (Colour)",
    svg: "/brand/convex-mark-colour.svg",
    png: "/brand/convex-mark-colour.png",
    background: "dark",
    usage: "App icons, avatars and favicons",
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
    description: "Use the dark blue logo on light backgrounds, and the white or colour logo on dark backgrounds, for optimal contrast.",
  },
  {
    title: "No Modifications",
    description: "Do not stretch, rotate, add effects, or alter the logo colours outside of approved variants.",
  },
];
