import type { AuthUser, ResultRecord, Student } from "@/types";
import { scoreToGrade, gradeRemark, average } from "@/utils/gradeUtils";

/**
 * This file simulates a backend database (the kind you'd normally get
 * from SQLite/Postgres) so the whole app runs standalone in the browser.
 * Every function here has a matching signature you could re-implement
 * against a real REST/GraphQL API without touching any component code —
 * see src/services/resultService.ts for the swap point.
 */

export interface SeedUser extends AuthUser {
  password: string; // demo only — never store plaintext passwords in production
}

export const SUBJECTS = [
  { id: "sub-1", name: "Mathematics" },
  { id: "sub-2", name: "English Language" },
  { id: "sub-3", name: "Physics" },
  { id: "sub-4", name: "Chemistry" },
  { id: "sub-5", name: "Biology" },
  { id: "sub-6", name: "Economics" },
];

export const STUDENTS: Student[] = [
  {
    id: "stu-1",
    admissionNumber: "GHS/2024/041",
    fullName: "Amara Chukwu",
    className: "SS2 Gold",
    email: "amara.chukwu@example.com",
  },
  {
    id: "stu-2",
    admissionNumber: "GHS/2024/017",
    fullName: "Tunde Bakare",
    className: "SS2 Gold",
    email: "tunde.bakare@example.com",
  },
];

export const USERS: SeedUser[] = [
  {
    id: "user-1",
    username: "amara.chukwu",
    password: "student123",
    role: "student",
    displayName: "Amara Chukwu",
    studentId: "stu-1",
  },
  {
    id: "user-2",
    username: "tunde.bakare",
    password: "student123",
    role: "student",
    displayName: "Tunde Bakare",
    studentId: "stu-2",
  },
  {
    id: "user-admin",
    username: "admin",
    password: "admin123",
    role: "admin",
    displayName: "Mrs. Adeyemi (Registrar)",
  },
];

function buildResult(
  id: string,
  studentId: string,
  term: ResultRecord["term"],
  session: string,
  rawScores: number[],
  comment: string,
  status: ResultRecord["status"] = "published"
): ResultRecord {
  const subjects = SUBJECTS.map((subject, i) => {
    const score = rawScores[i];
    const grade = scoreToGrade(score);
    return {
      subjectId: subject.id,
      subjectName: subject.name,
      score,
      grade,
      remark: gradeRemark(grade),
    };
  });

  return {
    id,
    studentId,
    term,
    session,
    subjects,
    average: average(rawScores),
    totalScore: rawScores.reduce((a, b) => a + b, 0),
    teacherComment: comment,
    status,
  };
}

export const RESULTS: ResultRecord[] = [
  buildResult(
    "res-1",
    "stu-1",
    "First Term",
    "2025/2026",
    [82, 74, 69, 71, 88, 65],
    "Amara is a diligent student with strong analytical skills. Keep it up!"
  ),
  buildResult(
    "res-2",
    "stu-1",
    "Second Term",
    "2025/2026",
    [78, 80, 72, 75, 84, 70],
    "Consistent improvement across the board this term."
  ),
  buildResult(
    "res-3",
    "stu-2",
    "First Term",
    "2025/2026",
    [58, 63, 49, 55, 60, 52],
    "Tunde should dedicate more time to Physics revision."
  ),
  buildResult(
    "res-4",
    "stu-2",
    "Second Term",
    "2025/2026",
    [64, 68, 54, 60, 66, 58],
    "Good progress from last term — Physics grade has improved.",
    "draft"
  ),
];
