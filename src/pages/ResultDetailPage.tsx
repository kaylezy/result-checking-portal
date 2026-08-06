import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getResultById, getStudent } from "@/services/resultService";
import type { ResultRecord, Student } from "@/types";
import { PageShell } from "@/components/Layout/PageShell";
import { Card } from "@/components/UI/Card";
import { ResultSummary } from "@/components/Results/ResultSummary";
import { ResultTable } from "@/components/Results/ResultTable";
import { Button } from "@/components/UI/Button";

export function ResultDetailPage() {
  const { resultId } = useParams<{ resultId: string }>();
  const [result, setResult] = useState<ResultRecord | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!resultId) return;
    let isMounted = true;

    async function load() {
      const record = await getResultById(resultId!);
      if (!isMounted) return;
      setResult(record ?? null);
      if (record) {
        const studentRecord = await getStudent(record.studentId);
        if (isMounted) setStudent(studentRecord ?? null);
      }
      setIsLoading(false);
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [resultId]);

  return (
    <PageShell>
      <Link to="/dashboard" className="text-sm font-medium text-ledger-goldDim hover:underline">
        ← Back to my results
      </Link>

      {isLoading && <p className="mt-6 font-mono text-sm text-ledger-slate">Loading result…</p>}

      {!isLoading && !result && (
        <Card className="mt-6 p-8 text-center text-sm text-ledger-slate">
          This result could not be found.
        </Card>
      )}

      {result && (
        <Card className="mt-6 p-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="font-display text-2xl font-semibold text-ledger-navy">
                {student?.fullName ?? "Student"}
              </h1>
              <p className="text-sm text-ledger-slate">
                {student?.admissionNumber} · {student?.className}
              </p>
            </div>
            <Button variant="ghost" onClick={() => window.print()}>
              Print / Save as PDF
            </Button>
          </div>

          <ResultSummary result={result} />

          <div className="mt-6">
            <ResultTable subjects={result.subjects} />
          </div>

          <div className="mt-6 rounded-sm bg-ledger-paperDim px-4 py-3">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ledger-slate">
              Teacher's comment
            </p>
            <p className="mt-1 text-sm text-ledger-navy">{result.teacherComment}</p>
          </div>
        </Card>
      )}
    </PageShell>
  );
}
