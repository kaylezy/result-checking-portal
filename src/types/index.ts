export type UserRole = "student" | "admin";

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
  displayName: string;
  studentId?: string; // set when role === "student"
}

export interface Student {
  id: string;
  admissionNumber: string;
  fullName: string;
  className: string;
  email: string;
}

export interface SubjectScore {
  subjectId: string;
  subjectName: string;
  score: number; // 0 - 100
  grade: string; // derived, e.g. A1, B2, C4, F9
  remark: string;
}

export type ResultStatus = "draft" | "published";

export interface ResultRecord {
  id: string;
  studentId: string;
  term: "First Term" | "Second Term" | "Third Term";
  session: string; // e.g. "2025/2026"
  subjects: SubjectScore[];
  average: number;
  totalScore: number;
  classPosition?: number;
  teacherComment: string;
  status: ResultStatus;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
