import type { ResultRecord, Student } from "@/types";
import { Badge } from "@/components/UI/Badge";
import { Button } from "@/components/UI/Button";
import { setResultStatus } from "@/services/resultService";

interface StudentRecordsTableProps {
  results: ResultRecord[];
  students: Student[];
  onStatusChange: (result: ResultRecord) => void;
}

export function StudentRecordsTable({ results, students, onStatusChange }: StudentRecordsTableProps) {
  const studentName = (studentId: string) =>
    students.find((s) => s.id === studentId)?.fullName ?? "Unknown student";

  const toggleStatus = async (result: ResultRecord) => {
    const nextStatus = result.status === "published" ? "draft" : "published";
    const updated = await setResultStatus(result.id, nextStatus);
    if (updated) onStatusChange(updated);
  };

  if (results.length === 0) {
    return (
      <p className="rounded-sm border border-dashed border-ledger-navy/20 px-4 py-6 text-center text-sm text-ledger-slate">
        No results recorded yet. Use the form above to add the first one.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-ledger-navy/20 font-mono text-[11px] uppercase tracking-widest text-ledger-slate">
            <th className="py-3 pr-4">Student</th>
            <th className="py-3 pr-4">Term</th>
            <th className="py-3 pr-4">Average</th>
            <th className="py-3 pr-4">Status</th>
            <th className="py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id} className="border-b border-ledger-navy/10 last:border-0">
              <td className="py-3 pr-4 font-medium text-ledger-navy">
                {studentName(result.studentId)}
              </td>
              <td className="py-3 pr-4 text-ledger-slate">
                {result.term} · {result.session}
              </td>
              <td className="py-3 pr-4 font-mono">{result.average}</td>
              <td className="py-3 pr-4">
                <Badge tone={result.status === "published" ? "pass" : "neutral"}>
                  {result.status}
                </Badge>
              </td>
              <td className="py-3">
                <Button variant="ghost" onClick={() => toggleStatus(result)} className="!px-3 !py-1.5 text-xs">
                  {result.status === "published" ? "Unpublish" : "Publish"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
