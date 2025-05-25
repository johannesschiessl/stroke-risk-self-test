import { Question, RiskBand } from "./types";

/** Sum points of chosen answers */
export function calcScore(
  selected: Record<string, number>, // { familyHistory: 1, smoking: 2, … }
): number {
  return Object.values(selected).reduce((s, val) => s + val, 0);
}

/** Map a score to its category */
export function classify(score: number, bands: RiskBand[]): RiskBand {
  if (score > 17) {
    return bands[bands.length - 1];
  }
  const band = bands.find((b) => score >= b.min && score <= b.max);
  if (!band) {
    throw new Error(`No risk band found for score: ${score}`);
  }
  return band;
}

/** Check if all questions have been answered */
export function isQuizComplete(
  answers: Record<string, number>,
  questions: Question[],
): boolean {
  return questions.every((q) => q.id in answers);
}

/** Get progress percentage */
export function getProgress(
  answers: Record<string, number>,
  questions: Question[],
): number {
  const answeredCount = Object.keys(answers).length;
  return Math.round((answeredCount / questions.length) * 100);
}
