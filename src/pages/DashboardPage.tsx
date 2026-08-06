import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getResultsForStudent, getStudent } from "@/services/resultService";
import type { ResultRecord, Student } from "@/types";
import { PageShell } from "@/components/Layout/PageShell";
import { ResultCard } from "@/components/Results/ResultCard";
import { Card } from "@/components/UI/Card";

export function DashboardPage() {
  const { user } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [results, setResults] = useState<ResultRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.studentId) return;
    let isMounted = true;

    async function load() {
      const [studentRecord, studentResults] = await Promise.all([
        getStudent(user!.studentId!),
        getResultsForStudent(user!.studentId!),
      ]);
      if (!isMounted) return;
      setStudent(studentRecord ?? null);
      setResults(studentResults);
      setIsLoading(false);
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <PageShell>
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-ledger-slate">
          Student Records
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ledger-navy">
          Welcome back, {student?.fullName.split(" ")[0] ?? "…"}
        </h1>
        {student && (
          <p className="mt-2 text-sm text-ledger-slate">
            {student.admissionNumber} · {student.className}
          </p>
        )}
      </div>

      {isLoading && <p className="font-mono text-sm text-ledger-slate">Loading your results…</p>}

      {!isLoading && results.length === 0 && (
        <Card className="p-8 text-center text-sm text-ledger-slate">
          No published results yet. Check back once your school publishes this term's results.
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {results.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}
      </div>
    </PageShell>
  );
}
