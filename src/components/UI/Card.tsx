import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`rounded-md border border-ledger-navy/10 bg-white shadow-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
