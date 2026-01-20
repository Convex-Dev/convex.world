import type { ComponentProps, ReactNode } from 'react';

type HexProps = Omit<ComponentProps<'div'>, 'children'> & {
  width?: number | string;
  height?: number | string;
  children?: ReactNode;
};

export default function Hex({
  width = 100,
  height = 100,
  className = '',
  children,
  ...props
}: HexProps) {
  const composedClassName = className ? `hex-icon ${className}` : 'hex-icon';

  return (
    <div>
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

