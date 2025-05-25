export interface Option {
  label: string;
  points: number;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface RiskBand {
  min: number;
  max: number;
  label: string;
  description: string;
  color: "ok" | "warn" | "alert";
}
