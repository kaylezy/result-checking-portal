import { useEffect, useState } from "react";
import { getAllResults, getAllStudents } from "@/services/resultService";
import type { ResultRecord, Student } from "@/types";
import { PageShell } from "@/components/Layout/PageShell";
import { Card } from "@/components/UI/Card";
import { AdminUploadForm } from "@/components/Admin/AdminUploadForm";
import { StudentRecordsTable } from "@/components/Admin/StudentRecordsTable";

export function AdminPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [results, setResults] = useState<ResultRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [allStudents, allResults] = await Promise.all([getAllStudents(), getAllResults()]);
      setStudents(allStudents);
      setResults(allResults);
      setIsLoading(false);
    }
    load();
  }, []);

  const handleCreated = (result: ResultRecord) => {
    setResults((prev) => [...prev, result]);
  };

  const handleStatusChange = (updated: ResultRecord) => {
    setResults((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  return (
    <PageShell>
      <div className="mb-8">
        
        <h1 className="mt-1 font-display text-3xl font-semibold text-ledger-navy">
          Manage student results
        </h1>
        <p className="mt-2 text-sm text-ledger-slate">
          Add scores for a student, then publish when you're ready for them to see it.
        </p>
      </div>

      {isLoading ? (
        <p className="font-mono text-sm text-ledger-slate">Loading records…</p>
      ) : (
        <div className="flex flex-col gap-8">
          <Card className="p-8">
            <h2 className="mb-6 font-display text-lg font-semibold text-ledger-navy">
              Enter a new result
            </h2>
            <AdminUploadForm students={students} onCreated={handleCreated} />
          </Card>

          <Card className="p-8">
            <h2 className="mb-6 font-display text-lg font-semibold text-ledger-navy">
              All records
            </h2>
            <StudentRecordsTable
              results={results}
              students={students}
              onStatusChange={handleStatusChange}
            />
          </Card>
        </div>
      )}
    </PageShell>
  );
}
