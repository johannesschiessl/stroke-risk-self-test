import { Question, RiskBand } from "./types";

export const questions: Question[] = [
  {
    id: "familyHistory",
    text: "Gab es in deiner Familie Herzinfarkt / Schlaganfall?",
    options: [
      { label: "Männer < 55 Jahre oder Frauen < 60 Jahre", points: 2 },
      { label: "Männer ≥ 55 Jahre oder Frauen ≥ 60 Jahre", points: 1 },
      { label: "Nein", points: 0 },
    ],
  },
  {
    id: "smoking",
    text: "Rauchst du?",
    options: [
      { label: "Ja, mehr als 10 Zigaretten täglich", points: 2 },
      { label: "Ja, bis zu 10 Zigaretten täglich", points: 1 },
      { label: "Nein / Ex-Raucher (>1 Jahr)", points: 0 },
    ],
  },
  {
    id: "bmi",
    text: "Wie ist dein Body-Mass-Index (BMI)?",
    options: [
      { label: "BMI ≥ 30 (stark übergewichtig)", points: 2 },
      { label: "BMI 25-29,9 (übergewichtig)", points: 1 },
      { label: "BMI < 25 (normalgewichtig)", points: 0 },
    ],
  },
  {
    id: "diet",
    text: "Wie ernährst du dich?",
    options: [
      { label: "Viel Fast Food, wenig Obst/Gemüse", points: 2 },
      { label: "Gemischte Kost", points: 1 },
      { label: "Mediterrane Kost, viel Obst/Gemüse", points: 0 },
    ],
  },
  {
    id: "activity",
    text: "Wie aktiv bist du körperlich?",
    options: [
      { label: "Weniger als 30 Min./Woche", points: 2 },
      { label: "30-150 Min./Woche", points: 1 },
      { label: "Mehr als 150 Min./Woche", points: 0 },
    ],
  },
  {
    id: "cholesterol",
    text: "Wie sind deine Cholesterinwerte?",
    options: [
      { label: "LDL > 160 mg/dl oder unbekannt", points: 2 },
      { label: "LDL 130-160 mg/dl", points: 1 },
      { label: "LDL < 130 mg/dl", points: 0 },
    ],
  },
  {
    id: "bloodPressure",
    text: "Wie ist dein Blutdruck?",
    options: [
      { label: "≥ 160/100 mmHg oder unbehandelt hoch", points: 2 },
      { label: "140-159/90-99 mmHg", points: 1 },
      { label: "< 140/90 mmHg", points: 0 },
    ],
  },
  {
    id: "diabetes",
    text: "Hast du Diabetes?",
    options: [
      { label: "Ja, schlecht eingestellt (HbA1c > 7%)", points: 2 },
      { label: "Ja, gut eingestellt (HbA1c ≤ 7%)", points: 1 },
      { label: "Nein", points: 0 },
    ],
  },
  {
    id: "stress",
    text: "Wie ist dein Stresslevel?",
    options: [
      { label: "Dauerhaft hoher Stress", points: 2 },
      { label: "Gelegentlicher Stress", points: 1 },
      { label: "Wenig Stress", points: 0 },
    ],
  },
  {
    id: "heartDisease",
    text: "Hast du eine Herzerkrankung?",
    options: [
      { label: "Ja, Angina pectoris oder KHK", points: 2 },
      { label: "Herzrhythmusstörungen", points: 1 },
      { label: "Nein", points: 0 },
    ],
  },
];

export const bands: RiskBand[] = [
  {
    min: 0,
    max: 4,
    label: "Geringes Risiko",
    description:
      "Dein Schlaganfall-Risiko ist unterdurchschnittlich. Behalte deinen gesunden Lebensstil bei.",
    color: "ok",
  },
  {
    min: 5,
    max: 8,
    label: "Durchschnittliches Risiko",
    description:
      "Dein Schlaganfall-Risiko entspricht dem Durchschnitt. Achte auf eine gesunde Lebensweise.",
    color: "warn",
  },
  {
    min: 9,
    max: 12,
    label: "Erhöhtes Risiko",
    description:
      "Dein Schlaganfall-Risiko ist erhöht. Sprich mit deinem Arzt über Präventionsmaßnahmen.",
    color: "alert",
  },
  {
    min: 13,
    max: 17,
    label: "Deutlich erhöhtes Risiko",
    description:
      "Dein Schlaganfall-Risiko ist deutlich erhöht. Suche zeitnah einen Arzt auf.",
    color: "alert",
  },
];
