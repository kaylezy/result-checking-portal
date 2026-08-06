import type { ReactNode } from "react";

type Tone = "pass" | "fail" | "neutral" | "gold";

const TONE_STYLES: Record<Tone, string> = {
  pass: "bg-ledger-pass/10 text-ledger-pass border-ledger-pass/30",
  fail: "bg-ledger-fail/10 text-ledger-fail border-ledger-fail/30",
  neutral: "bg-ledger-slate/10 text-ledger-slate border-ledger-slate/30",
  gold: "bg-ledger-gold/15 text-ledger-goldDim border-ledger-gold/40",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${TONE_STYLES[tone]}`}
    >
      {children}
    </span>
  );
}
