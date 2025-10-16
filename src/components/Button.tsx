import Image from "next/image";
import React from "react";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  rightIconSrc?: string;
  rightIconAlt?: string;
  rightIconWidth?: number;
  rightIconHeight?: number;
}

export default function Button({
  href,
  children,
  className,
  target,
  rel,
  rightIconSrc,
  rightIconAlt,
  rightIconWidth = 24,
  rightIconHeight = 24,
}: ButtonProps) {
  return (
    <a href={href} target={target} rel={rel} className={`button${className ? ` ${className}` : ""}`}>
      {children}
      {rightIconSrc ? (
        <Image
          src={rightIconSrc}
          alt={rightIconAlt || ""}
          width={rightIconWidth}
          height={rightIconHeight}
        />
      ) : null}
    </a>
  );
}


