import { useState, type FormEvent } from "react";
import type { ResultRecord, Student } from "@/types";
import { SUBJECTS } from "@/data/mockDatabase";
import { createResult } from "@/services/resultService";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Alert } from "@/components/UI/Alert";

interface AdminUploadFormProps {
  students: Student[];
  onCreated: (result: ResultRecord) => void;
}

const TERMS: ResultRecord["term"][] = ["First Term", "Second Term", "Third Term"];

export function AdminUploadForm({ students, onCreated }: AdminUploadFormProps) {
  const [studentId, setStudentId] = useState(students[0]?.id ?? "");
  const [term, setTerm] = useState<ResultRecord["term"]>("First Term");
  const [session, setSession] = useState("2025/2026");
  const [comment, setComment] = useState("");
  const [scores, setScores] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleScoreChange = (subjectId: string, value: string) => {
    setScores((prev) => ({ ...prev, [subjectId]: value }));
  };

  const handleSubmit = async (event: FormEvent, publish: boolean) => {
    event.preventDefault();
    setStatus("saving");
    setErrorMessage("");

    const parsedScores = SUBJECTS.map((subject) => {
      const raw = Number(scores[subject.id]);
      return { subjectId: subject.id, subjectName: subject.name, score: raw };
    });

    const invalid = parsedScores.some((s) => Number.isNaN(s.score) || s.score < 0 || s.score > 100);
    if (invalid || !studentId) {
      setStatus("error");
      setErrorMessage("Enter a valid score (0–100) for every subject before saving.");
      return;
    }

    try {
      const record = await createResult({
        studentId,
        term,
        session,
        scores: parsedScores,
        teacherComment: comment,
        status: publish ? "published" : "draft",
      });
      onCreated(record);
      setScores({});
      setComment("");
      setStatus("idle");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong while saving. Please try again.");
    }
  };

  return (
    <form className="flex flex-col gap-6">
      {status === "error" && <Alert tone="error">{errorMessage}</Alert>}

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ledger-navy/80">
          Student
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="rounded-sm border border-ledger-navy/20 bg-white px-3.5 py-2.5 text-sm"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.fullName} ({s.admissionNumber})
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-ledger-navy/80">
          Term
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value as ResultRecord["term"])}
            className="rounded-sm border border-ledger-navy/20 bg-white px-3.5 py-2.5 text-sm"
          >
            {TERMS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <Input label="Session" value={session} onChange={(e) => setSession(e.target.value)} />
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-ledger-navy/80">Subject scores (0–100)</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {SUBJECTS.map((subject) => (
            <Input
              key={subject.id}
              label={subject.name}
              type="number"
              min={0}
              max={100}
              value={scores[subject.id] ?? ""}
              onChange={(e) => handleScoreChange(subject.id, e.target.value)}
              placeholder="0 - 100"
            />
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-ledger-navy/80">
        Teacher's comment
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="rounded-sm border border-ledger-navy/20 bg-white px-3.5 py-2.5 text-sm"
          placeholder="A brief remark on the student's performance this term…"
        />
      </label>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="ghost"
          isLoading={status === "saving"}
          onClick={(e) => handleSubmit(e, false)}
        >
          Save as draft
        </Button>
        <Button
          type="button"
          variant="secondary"
          isLoading={status === "saving"}
          onClick={(e) => handleSubmit(e, true)}
        >
          Publish result
        </Button>
      </div>
    </form>
  );
}
