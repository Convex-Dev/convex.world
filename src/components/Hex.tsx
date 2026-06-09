import type { ComponentProps, ReactNode } from 'react';

type HexProps = Omit<ComponentProps<'div'>, 'children'> & {
  width?: number | string;
  height?: number | string;
  children?: ReactNode;
};

export default function Hex({
  width = 100,
  height = 100,
  className,
  children,
  style,
  ...props
}: HexProps) {
  return (
    <div
      {...props}
      className={className ? `hex-icon ${className}` : 'hex-icon'}
      style={{ width, height, ...style }}
    >
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        <use href="/svg/hex.svg#hex-polygon" />
      </svg>
      {children}
    </div>
  );
}

