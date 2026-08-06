import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = "", ...rest }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ledger-navy/80">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`rounded-sm border border-ledger-navy/20 bg-white px-3.5 py-2.5 font-body text-sm text-ledger-navy placeholder:text-ledger-slate/50 focus:border-ledger-gold ${
            error ? "border-ledger-fail" : ""
          } ${className}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs font-medium text-ledger-fail">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
