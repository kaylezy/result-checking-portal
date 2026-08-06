import type { ResultRecord } from "@/types";
import { isPassingGrade, scoreToGrade } from "@/utils/gradeUtils";

/**
 * The "wax seal" summary badge — the one signature visual element of the
 * portal. A circular seal stamped with the term average, echoing the way a
 * physical report card is signed and sealed by the registrar.
 */
export function ResultSummary({ result }: { result: ResultRecord }) {
  const overallGrade = scoreToGrade(result.average);
  const passed = isPassingGrade(overallGrade);
  const subjectsPassed = result.subjects.filter((s) => isPassingGrade(s.grade)).length;

  return (
    <div className="flex flex-col items-center gap-6 border-b border-dashed border-ledger-navy/20 pb-8 sm:flex-row sm:justify-between sm:gap-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ledger-slate">
          {result.session} · {result.term}
        </p>
        <p className="mt-1 font-display text-2xl font-semibold text-ledger-navy">
          Term Summary
        </p>
        <p className="mt-2 text-sm text-ledger-slate">
          {subjectsPassed} of {result.subjects.length} subjects passed · Total score{" "}
          {result.totalScore}
        </p>
      </div>

      <div
        className={`relative flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border-4 shadow-seal ${
          passed
            ? "border-ledger-gold bg-ledger-navy text-ledger-paper"
            : "border-ledger-fail bg-ledger-fail/5 text-ledger-fail"
        }`}
        aria-label={`Overall grade ${overallGrade}`}
      >
        <span className="font-display text-3xl font-bold leading-none">{overallGrade}</span>
        <span className="mt-1 font-mono text-[10px] uppercase tracking-widest opacity-80">
          Avg {result.average}
        </span>
      </div>
    </div>
  );
}
