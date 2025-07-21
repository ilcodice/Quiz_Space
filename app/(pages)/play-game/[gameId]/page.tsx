"use client";

import { useEffect, useState } from "react";
import { Button } from "../../../../client/src/components/ui/button";
import { Card, CardContent } from "../../../../client/src/components/ui/card";
import { Badge } from "../../../../client/src/components/ui/badge";
import { ArrowLeft, Trophy } from "lucide-react";
import React from "react";
import { useParams, useRouter } from "next/navigation";

type Choice = {
  id: string;
  text: string;
};

type Question = {
  text: string;
  choices: { [key: string]: string };
  correctAnswer: string;
  category: string;
};

export default function QuizGame() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.gameId;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/games/${gameId}/questions`);
        if (!res.ok) throw new Error("Failed to fetch questions");
        const data = await res.json();
        setQuestions(data.slice(0, 10)); // Limit to 10 questions
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) {
      fetchQuestions();
    }
  }, [gameId]);

  if (loading) {
    return <div className="text-center p-8 text-white">Loading questions...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  if (questions.length === 0) {
    return <div className="text-center p-8 text-white">No questions available for this game.</div>;
  }

  const question = questions[currentQuestion];

  const handleAnswerSelect = (id: string) => {
    if (showResult) return;
    setSelectedAnswer(id);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    setShowResult(true);
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameCompleted(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameCompleted(false);
  };

  if (gameCompleted) {
    return (
      <div className="bg-black p-6 flex items-center justify-center min-h-screen">
        <Card className="bg-gray-900 border-gray-800 w-full max-w-md text-center">
          <CardContent className="p-8">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Game Complete!</h2>
            <div className="text-4xl font-bold text-green-400 mb-6">{score} Points</div>
            <div className="text-gray-300 mb-6">
              You answered {score / 10} out of {questions.length} questions correctly!
            </div>
            <div className="flex gap-4">
              <Button
                onClick={resetGame}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white"
              >
                Play Again
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/games")}
                className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Exit Game
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-gray-800 p-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Badge className="bg-gray-800 text-white text-lg px-4 py-2">Score: {score}</Badge>
          </div>
          <div className="text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-white mb-8">{question.text}</h2>

            {/* Choices */}
            <div className="grid gap-4">
              {Object.entries(question.choices).map(([id, text]) => {
                let buttonClass =
                  "w-full p-6 text-left bg-gray-800 border-gray-700 text-white hover:bg-gray-700 transition-colors";

                if (showResult) {
                  if (id === question.correctAnswer) {
                    buttonClass = "w-full p-6 text-left bg-green-800 border-green-600 text-white";
                  } else if (id === selectedAnswer && id !== question.correctAnswer) {
                    buttonClass = "w-full p-6 text-left bg-red-800 border-red-600 text-white";
                  } else {
                    buttonClass = "w-full p-6 text-left bg-gray-800 border-gray-700 text-gray-400";
                  }
                } else if (selectedAnswer === id) {
                  buttonClass = "w-full p-6 text-left bg-blue-800 border-blue-600 text-white";
                }

                return (
                  <Button
                    key={id}
                    variant="outline"
                    className={buttonClass}
                    onClick={() => handleAnswerSelect(id)}
                    disabled={showResult}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg">{id.toUpperCase()}.</span>
                      <span className="text-lg">{text}</span>
                    </div>
                  </Button>
                );
              })}
            </div>

            {/* Submit */}
            {!showResult && (
              <div className="mt-8 text-center">
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 text-lg"
                >
                  Submit Answer
                </Button>
              </div>
            )}

            {/* Result */}
            {showResult && (
              <div className="mt-8 text-center">
                <div
                  className={`text-xl font-semibold ${
                    selectedAnswer === question.correctAnswer ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {selectedAnswer === question.correctAnswer ? "Correct! +10 points" : "Incorrect!"}
                </div>
                {currentQuestion < questions.length - 1 ? (
                  <div className="text-gray-400 mt-2">Next question in 2 seconds...</div>
                ) : (
                  <div className="text-gray-400 mt-2">Calculating final score...</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
