import type { ComponentProps } from 'react';
import { LOGO_PATHS, LOGO_VIEWBOX, MARK_PATHS, MARK_VIEWBOX } from '@/lib/logo-paths';

type LogoProps = Omit<ComponentProps<'svg'>, 'viewBox' | 'children'> & {
  /** `logo` is the mark with the CONVEX lettering; `mark` is the hexagon alone. */
  variant?: 'logo' | 'mark';
  title?: string;
};

/**
 * The Convex logo as inline SVG. It takes its colour from CSS `color`, so set
 * that rather than recolouring with filters. Downloadable files live in public/brand/.
 */
export default function Logo({
  variant = 'logo',
  title = 'Convex',
  className = '',
  ...props
}: LogoProps) {
  const isMark = variant === 'mark';
  const composedClassName = className ? `logo ${className}` : 'logo';

  return (
    <svg
      viewBox={isMark ? MARK_VIEWBOX : LOGO_VIEWBOX}
      fill="currentColor"
      role="img"
      aria-label={title}
      className={composedClassName}
      {...props}
    >
      {(isMark ? MARK_PATHS : LOGO_PATHS).map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
