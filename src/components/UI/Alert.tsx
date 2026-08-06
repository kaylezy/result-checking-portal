import type { ReactNode } from "react";

type Tone = "error" | "info" | "success";

const TONE_STYLES: Record<Tone, string> = {
  error: "bg-ledger-fail/10 text-ledger-fail border-ledger-fail/30",
  info: "bg-ledger-navy/5 text-ledger-navy border-ledger-navy/20",
  success: "bg-ledger-pass/10 text-ledger-pass border-ledger-pass/30",
};

export function Alert({ tone = "info", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <div role="alert" className={`rounded-sm border px-4 py-3 text-sm ${TONE_STYLES[tone]}`}>
      {children}
    </div>
  );
}
