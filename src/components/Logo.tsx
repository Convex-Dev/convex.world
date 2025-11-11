import type { ComponentProps } from 'react';
import Image from 'next/image';

type BaseImageProps = ComponentProps<typeof Image>;

type LogoProps = Omit<BaseImageProps, 'src' | 'alt' | 'width' | 'height'> & {
  alt?: string;
  width?: number;
  height?: number;
};

export default function Logo({
  alt = 'Convex logo',
  width = 200,
  height = 60,
  className = '',
  priority = false,
  ...props
}: LogoProps) {
  const composedClassName = className ? `logo ${className}` : 'logo';

  return (
    <Image
      src="/images/logo_dark_blue.svg"
      alt={alt}
      width={width}
      height={height}
      className={composedClassName}
      priority={priority}
      {...props}
    />
  );
}

