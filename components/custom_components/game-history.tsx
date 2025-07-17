// app/game-history/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GameHistoryEntry {
  id: string;
  name: string;
  datePlayed: string;
  score: number;
  difficulty: string;
}

export default function GameHistoryPage() {
  const [history, setHistory] = useState<GameHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Replace this with your real API call:
    const fetchHistory = async () => {
      // Example: GET /api/games/history
      const data: GameHistoryEntry[] = [
        {
          id: "1",
          name: "Quiz 1",
          datePlayed: "2025-07-15T10:00:00Z",
          score: 80,
          difficulty: "easy",
        },
        {
          id: "2",
          name: "Quiz 2",
          datePlayed: "2025-07-14T09:00:00Z",
          score: 60,
          difficulty: "medium",
        },
      ];
      setHistory(data);
      setLoading(false);
    };

    fetchHistory();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "hard":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center p-8">Loading your history...</div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="bg-black p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-6">Game History</h1>

        {history.length === 0 && (
          <div className="text-white text-center">
            You haven’t played any games yet.
          </div>
        )}

        <div className="space-y-4">
          {history.map((game) => (
            <Card key={game.id} className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">
                    {game.name}
                  </h3>
                  <Badge className="bg-gray-800 text-xs">
                    {new Date(game.datePlayed).toLocaleDateString()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Score:</span>
                  <span className="text-white text-sm font-medium">
                    {game.score}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Difficulty:</span>
                  <Badge
                    variant="secondary"
                    className={`bg-gray-800 ${getDifficultyColor(
                      game.difficulty
                    )} hover:bg-gray-700`}
                  >
                    {game.difficulty}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
