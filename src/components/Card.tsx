import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <article className={`card${className ? ` ${className}` : ""}`}>
      {children}
    </article>
  );
}

