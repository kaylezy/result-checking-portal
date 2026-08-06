import { Link } from "react-router-dom";
import type { ResultRecord } from "@/types";
import { Card } from "@/components/UI/Card";
import { Badge } from "@/components/UI/Badge";
import { isPassingGrade, scoreToGrade } from "@/utils/gradeUtils";

export function ResultCard({ result }: { result: ResultRecord }) {
  const overallGrade = scoreToGrade(result.average);

  return (
    <Link to={`/results/${result.id}`} className="block">
      <Card className="group relative flex items-center justify-between overflow-hidden px-5 py-4 transition-shadow hover:shadow-md">
        <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-ledger-paper" />
        <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-ledger-paper" />

        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-ledger-slate">
            {result.session}
          </p>
          <p className="font-display text-lg font-semibold text-ledger-navy group-hover:text-ledger-goldDim">
            {result.term}
          </p>
          <p className="mt-1 text-sm text-ledger-slate">Average score: {result.average}</p>
        </div>

        <Badge tone={isPassingGrade(overallGrade) ? "pass" : "fail"}>{overallGrade}</Badge>
      </Card>
    </Link>
  );
}
