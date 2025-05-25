import { useState, useEffect } from "react";
import { questions, bands } from "./config";
import { calcScore, classify, isQuizComplete, getProgress } from "./engine";

const STORAGE_KEY = "stroke-risk-quiz-answers";

export function useHeartRisk() {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setAnswers(JSON.parse(saved));
      }
    } catch (error) {
      console.warn("Failed to load saved answers:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch (error) {
      console.warn("Failed to save answers:", error);
    }
  }, [answers]);

  const score = calcScore(answers);
  const category = score >= 0 ? classify(score, bands) : null;
  const isComplete = isQuizComplete(answers, questions);
  const progress = getProgress(answers, questions);

  const updateAnswer = (questionId: string, points: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: points }));
  };

  const resetQuiz = () => {
    setAnswers({});
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    questions,
    answers,
    updateAnswer,
    resetQuiz,
    score,
    category,
    isComplete,
    progress,
  };
}
