/**
 * Converts a numeric score (0-100) into a letter grade using a
 * WAEC-style 9-point grading scale. Swap this out freely if your
 * school uses a different scheme (e.g. GPA 4.0, A-F only).
 */
export function scoreToGrade(score: number): string {
  if (score >= 75) return "A1";
  if (score >= 70) return "B2";
  if (score >= 65) return "B3";
  if (score >= 60) return "C4";
  if (score >= 55) return "C5";
  if (score >= 50) return "C6";
  if (score >= 45) return "D7";
  if (score >= 40) return "E8";
  return "F9";
}

export function gradeRemark(grade: string): string {
  const map: Record<string, string> = {
    A1: "Excellent",
    B2: "Very Good",
    B3: "Good",
    C4: "Credit",
    C5: "Credit",
    C6: "Credit",
    D7: "Pass",
    E8: "Pass",
    F9: "Fail",
  };
  return map[grade] ?? "N/A";
}

export function isPassingGrade(grade: string): boolean {
  return grade !== "F9";
}

export function average(scores: number[]): number {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, s) => acc + s, 0);
  return Math.round((sum / scores.length) * 100) / 100;
}
