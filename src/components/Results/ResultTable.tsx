import type { SubjectScore } from "@/types";
import { Badge } from "@/components/UI/Badge";
import { isPassingGrade } from "@/utils/gradeUtils";

export function ResultTable({ subjects }: { subjects: SubjectScore[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-ledger-navy/20 font-mono text-[11px] uppercase tracking-widest text-ledger-slate">
            <th className="py-3 pr-4">Subject</th>
            <th className="py-3 pr-4">Score</th>
            <th className="py-3 pr-4">Grade</th>
            <th className="py-3">Remark</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.subjectId} className="border-b border-ledger-navy/10 last:border-0">
              <td className="py-3 pr-4 font-medium text-ledger-navy">{subject.subjectName}</td>
              <td className="py-3 pr-4 font-mono">{subject.score}</td>
              <td className="py-3 pr-4">
                <Badge tone={isPassingGrade(subject.grade) ? "pass" : "fail"}>
                  {subject.grade}
                </Badge>
              </td>
              <td className="py-3 text-ledger-slate">{subject.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
