"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { useHeartRisk } from "@/lib/heart-risk/use-heart-risk";
import {
  Heart,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

type QuizPage = "start" | "quiz" | "results";

export default function StrokeRiskQuiz() {
  const [currentPage, setCurrentPage] = useState<QuizPage>("start");
  const {
    questions,
    answers,
    updateAnswer,
    resetQuiz,
    score,
    category,
    isComplete,
    progress,
  } = useHeartRisk();

  const handleStartQuiz = () => {
    setCurrentPage("quiz");
  };

  const handleShowResults = () => {
    setCurrentPage("results");
  };

  const handleRestart = () => {
    resetQuiz();
    setCurrentPage("start");
  };

  const getRiskIcon = () => {
    if (!category) return <Heart className="h-8 w-8" />;

    switch (category.color) {
      case "ok":
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case "warn":
        return <AlertTriangle className="h-8 w-8 text-yellow-600" />;
      case "alert":
        return <AlertCircle className="h-8 w-8 text-red-600" />;
      default:
        return <Heart className="h-8 w-8" />;
    }
  };

  const getRiskColor = () => {
    if (!category) return "text-neutral-600";

    switch (category.color) {
      case "ok":
        return "text-green-600";
      case "warn":
        return "text-yellow-600";
      case "alert":
        return "text-red-600";
      default:
        return "text-neutral-600";
    }
  };

  if (currentPage === "start") {
    return (
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Heart className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-3xl font-bold text-neutral-900">
              Schlaganfall-Risiko Selbsttest
            </CardTitle>
            <CardDescription className="text-lg text-neutral-600 mt-4">
              Ermittle dein persönliches Schlaganfall-Risiko mit diesem
              wissenschaftlich fundierten Test. Der Test basiert auf den
              Richtlinien der Deutschen Herzstiftung.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">
                Was dich erwartet:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• 10 Fragen zu deinem Gesundheitszustand und Lebensstil</li>
                <li>• Dauer: ca. 3-5 Minuten</li>
                <li>• Sofortige Auswertung deines Risikos</li>
                <li>• Empfehlungen für weitere Schritte</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-yellow-800 text-sm">
                <strong>Wichtiger Hinweis:</strong> Dieser Test ersetzt keine
                ärztliche Diagnose oder Beratung. Bei Beschwerden oder
                Unsicherheiten wende dich bitte an deinen Arzt.
              </p>
            </div>

            <Button
              onClick={handleStartQuiz}
              className="w-full text-lg py-6"
              size="lg"
            >
              Test starten
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentPage === "quiz") {
    return (
      <div className="bg-indigo-50 min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">
                  Schlaganfall-Risiko Test
                </CardTitle>
                <div className="text-sm text-neutral-600">
                  {Object.keys(answers).length} von {questions.length} Fragen
                  beantwortet
                </div>
              </div>
              <Progress value={progress} className="mt-2" />
            </CardHeader>
          </Card>

          <div className="grid gap-6">
            {questions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {index + 1}. {question.text}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={answers[question.id]?.toString() || ""}
                    onValueChange={(value) =>
                      updateAnswer(question.id, parseInt(value))
                    }
                  >
                    {question.options.map((option) => (
                      <div
                        key={option.points}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={option.points.toString()}
                          id={`${question.id}-${option.points}`}
                        />
                        <Label
                          htmlFor={`${question.id}-${option.points}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleShowResults}
              disabled={!isComplete}
              size="lg"
              className="px-8"
            >
              {isComplete
                ? "Ergebnis anzeigen"
                : `Noch ${questions.length - Object.keys(answers).length} Fragen offen`}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === "results" && category) {
    return (
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">{getRiskIcon()}</div>
            <CardTitle className="text-3xl font-bold text-neutral-900">
              Dein Testergebnis
            </CardTitle>
            <div className="mt-4">
              <div className="text-6xl font-bold text-neutral-900 mb-2">
                {score}
              </div>
              <div className="text-sm text-neutral-600 mb-4">
                von maximal 17 Punkten
              </div>
              <div className={`text-2xl font-semibold ${getRiskColor()}`}>
                {category.label}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-neutral-50 p-4 rounded-lg">
              <p className="text-neutral-800">{category.description}</p>
            </div>

            {category.color === "alert" && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-900 mb-2">
                  Empfohlene Maßnahmen:
                </h3>
                <ul className="text-red-800 space-y-1">
                  <li>• Vereinbare zeitnah einen Termin bei deinem Hausarzt</li>
                  <li>• Lass deine Risikofaktoren medizinisch abklären</li>
                  <li>• Bespreche präventive Maßnahmen</li>
                </ul>
              </div>
            )}

            {category.color === "warn" && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-2">
                  Empfohlene Maßnahmen:
                </h3>
                <ul className="text-yellow-800 space-y-1">
                  <li>• Regelmäßige Vorsorgeuntersuchungen wahrnehmen</li>
                  <li>• Gesunde Ernährung und ausreichend Bewegung</li>
                  <li>• Risikofaktoren im Blick behalten</li>
                </ul>
              </div>
            )}

            {category.color === "ok" && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">
                  Weiter so!
                </h3>
                <ul className="text-green-800 space-y-1">
                  <li>• Behalte deinen gesunden Lebensstil bei</li>
                  <li>• Regelmäßige Vorsorgeuntersuchungen</li>
                  <li>• Bleib aktiv und ernähre dich gesund</li>
                </ul>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm">
                <strong>Wichtiger Hinweis:</strong> Dieser Test dient nur zur
                Orientierung und ersetzt keine ärztliche Diagnose. Bei Fragen
                oder Beschwerden wende dich bitte an deinen Arzt.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleRestart}
                variant="outline"
                className="flex-1"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Test wiederholen
              </Button>
              <Button onClick={() => window.print()} className="flex-1">
                Ergebnis drucken
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
