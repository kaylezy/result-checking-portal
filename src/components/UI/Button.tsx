import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
  children: ReactNode;
}

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    "bg-ledger-navy text-ledger-paper hover:bg-ledger-navyDeep disabled:bg-ledger-navy/50",
  secondary:
    "bg-ledger-gold text-ledger-navyDeep hover:bg-ledger-goldDim disabled:bg-ledger-gold/50",
  ghost:
    "bg-transparent text-ledger-navy border border-ledger-navy/30 hover:bg-ledger-navy/5",
  danger: "bg-ledger-fail text-ledger-paper hover:opacity-90 disabled:opacity-50",
};

export function Button({
  variant = "primary",
  isLoading = false,
  disabled,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 font-body text-sm font-semibold tracking-wide transition-colors disabled:cursor-not-allowed ${VARIANT_STYLES[variant]} ${className}`}
      {...rest}
    >
      {isLoading && (
        <span
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
