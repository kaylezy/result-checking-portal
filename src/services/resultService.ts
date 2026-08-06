import type { ResultRecord, Student } from "@/types";
import { RESULTS, STUDENTS } from "@/data/mockDatabase";
import { average, scoreToGrade, gradeRemark } from "@/utils/gradeUtils";

const RESULTS_KEY = "ledger.results";
const NETWORK_DELAY_MS = 350;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS));
}

function readResults(): ResultRecord[] {
  const raw = localStorage.getItem(RESULTS_KEY);
  if (!raw) {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(RESULTS));
    return RESULTS;
  }
  try {
    return JSON.parse(raw) as ResultRecord[];
  } catch {
    return RESULTS;
  }
}

function writeResults(results: ResultRecord[]): void {
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
}

/** Simulates GET /api/students/:studentId */
export async function getStudent(studentId: string): Promise<Student | undefined> {
  return delay(STUDENTS.find((s) => s.id === studentId));
}

/** Simulates GET /api/students */
export async function getAllStudents(): Promise<Student[]> {
  return delay(STUDENTS);
}

/** Simulates GET /api/results?studentId=&status=published */
export async function getResultsForStudent(studentId: string): Promise<ResultRecord[]> {
  const results = readResults().filter(
    (r) => r.studentId === studentId && r.status === "published"
  );
  return delay(results);
}

/** Simulates GET /api/results/:id */
export async function getResultById(id: string): Promise<ResultRecord | undefined> {
  return delay(readResults().find((r) => r.id === id));
}

/** Simulates GET /api/results (admin — includes drafts) */
export async function getAllResults(): Promise<ResultRecord[]> {
  return delay(readResults());
}

export interface UpsertResultInput {
  studentId: string;
  term: ResultRecord["term"];
  session: string;
  scores: { subjectId: string; subjectName: string; score: number }[];
  teacherComment: string;
  status: ResultRecord["status"];
}

/** Simulates POST /api/results (admin only) */
export async function createResult(input: UpsertResultInput): Promise<ResultRecord> {
  const results = readResults();
  const subjects = input.scores.map((s) => {
    const grade = scoreToGrade(s.score);
    return {
      subjectId: s.subjectId,
      subjectName: s.subjectName,
      score: s.score,
      grade,
      remark: gradeRemark(grade),
    };
  });

  const record: ResultRecord = {
    id: `res-${crypto.randomUUID()}`,
    studentId: input.studentId,
    term: input.term,
    session: input.session,
    subjects,
    average: average(input.scores.map((s) => s.score)),
    totalScore: input.scores.reduce((acc, s) => acc + s.score, 0),
    teacherComment: input.teacherComment,
    status: input.status,
  };

  const next = [...results, record];
  writeResults(next);
  return delay(record);
}

/** Simulates PATCH /api/results/:id/publish (admin only) */
export async function setResultStatus(
  id: string,
  status: ResultRecord["status"]
): Promise<ResultRecord | undefined> {
  const results = readResults();
  const updated = results.map((r) => (r.id === id ? { ...r, status } : r));
  writeResults(updated);
  return delay(updated.find((r) => r.id === id));
}
