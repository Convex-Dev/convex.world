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
  const baseClasses =
    "inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-convex-dark-blue text-white hover:bg-convex-medium-blue transition-colors";

  return (
    <a href={href} target={target} rel={rel} className={`${baseClasses}${className ? ` ${className}` : ""}`}>
      {children}
      {rightIconSrc ? (
        <Image
          src={rightIconSrc}
          alt={rightIconAlt || ""}
          width={rightIconWidth}
          height={rightIconHeight}
          className="ml-2"
        />
      ) : null}
    </a>
  );
}


