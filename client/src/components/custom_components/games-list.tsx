
"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Play, Plus } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/router';


interface Game {
  _id: string;
  name: string;
  difficulty: string;
  startDate: string;
  createdBy: string;
  mode: string;
  max_players: number;
  start_time: string;
  end_time?: string;
}

const AllGamesPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/games/all", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Games fetched:", data);

        // Adjust if your backend response is nested
        const gamesData = data.data?.games || data.games || data;
        setGames(gamesData);
      } catch (error: any) {
        console.error("Error fetching games:", error);
        setError(error.message || "Failed to fetch games.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
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
    return <div className="text-white text-center p-8">Loading games...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-8">Error: {error}</div>
    );
  }

  

  return (
    <div className="flex justify-center">
      <div className="bg-black/50 p-6 w-full max-w-7xl">
        <div className="mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">All Games</h1>
            <Link href="/create-quiz-game">
              <Button className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Game
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <Card key={game._id} className="bg-gray-900 border-gray-800 relative">
                <Link href={`/play-game?id=${game._id}`}>
                  <Button
                    size="sm"
                    className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white p-2 h-8 w-8"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
              </Link>


                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between pr-12">
                    <h3 className="text-xl font-semibold text-white">
                      {game.name}
                    </h3>
                    <Badge className="bg-gray-800 text-xs">{game.mode}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
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

                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Players:</span>
                    <span className="text-white text-sm">{game.max_players}</span>
                  </div>

                  <div className="space-y-1">
                  <div className="text-sm text-gray-400 flex items-center">
                    Start Date:
                    <span className="text-white font-medium ml-2">
                      {new Date(game.start_time).toISOString().slice(0, 10)}
                    </span>
                  </div>
                    <div className="text-sm text-gray-400">
                      Start time:
                      <span className="text-white font-medium ml-2">
                        {new Date(game.start_time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false
                        })}
                      </span> 
                    </div>
                  </div>

                  <div className="space-y-1">
                    {/* <div className="text-gray-400 text-sm">Created by:</div>
                    <div className="text-white text-sm font-medium">
                      {game.name}
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {games.length === 0 && (
            <div className="text-white text-center py-12">
              No games found. Create one to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllGamesPage;
