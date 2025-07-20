
// "use client"

// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Play, Plus } from "lucide-react"

// interface Game {
//   _id: string;
//   name: string;
//   difficulty: string;
//   startDate: string;
//   createdBy: string;
//   mode: string;
//   max_players: number;
//   start_time: string;
//   end_time?: string;
// }

// export default function Component() {
//   const [games, setGames] = useState<Game[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchGames = async () => {
//       try {
//         const response = await fetch('/api/games/all-games');
//         if (!response.ok) {
//           throw new Error('Failed to fetch games');
//         }
//         const data = await response.json();
//         setGames(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGames();
//   }, []);

//   const getDifficultyColor = (difficulty: string) => {
//     switch(difficulty.toLowerCase()) {
//       case 'easy': return 'text-green-400';
//       case 'medium': return 'text-yellow-400';
//       case 'hard': return 'text-red-400';
//       default: return 'text-gray-400';
//     }
//   };

//   if (loading) {
//     return <div className="text-white text-center p-8">Loading games...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500 text-center p-8">Error: {error}</div>;
//   }

//   return (
//     <div className="flex justify-center">
//       <div className="bg-black p-6 w-full max-w-7xl">
//         <div className="mx-auto">
//           <div className="mb-8 flex justify-between items-center">
//             <h1 className="text-3xl font-bold text-white">Games</h1>
//             <Button className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700">
//               <Plus className="mr-2 h-4 w-4" />
//               Create Game
//             </Button>
//           </div>

//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {games.map((game) => (
//               <Card key={game._id} className="bg-gray-900 border-gray-800 relative">
//                 <Button size="sm" className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white p-2 h-8 w-8">
//                   <Play className="h-4 w-4" />
//                 </Button>

//                 <CardHeader className="pb-3">
//                   <div className="flex items-center justify-between pr-12">
//                     <h3 className="text-xl font-semibold text-white">{game.name}</h3>
//                     <Badge className="bg-gray-800 text-xs">
//                       {game.mode}
//                     </Badge>
//                   </div>
//                 </CardHeader>

//                 <CardContent className="space-y-3">
//                   <div className="flex items-center gap-2">
//                     <span className="text-gray-400 text-sm">Difficulty:</span>
//                     <Badge variant="secondary" className={`bg-gray-800 ${getDifficultyColor(game.difficulty)} hover:bg-gray-700`}>
//                       {game.difficulty}
//                     </Badge>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <span className="text-gray-400 text-sm">Players:</span>
//                     <span className="text-white text-sm">{game.max_players}</span>
//                   </div>

//                   <div className="space-y-1">
//                     <div className="text-gray-400 text-sm">Start date:</div>
//                     <div className="text-white text-sm font-medium">{game.startDate}</div>
//                   </div>

//                   <div className="space-y-1">
//                     <div className="text-gray-400 text-sm">Created by:</div>
//                     <div className="text-white text-sm font-medium">{game.createdBy}</div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {games.length === 0 && (
//             <div className="text-white text-center py-12">
//               No games found. Create one to get started!
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// pages/all-games.js

// "use client"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Gamepad2, Clock, User, Trophy } from "lucide-react"
// import Link from "next/link"
// import { useEffect, useState } from "react"

// interface Game {
//   _id: string
//   name: string
//   difficulty: string
//   createdBy: string
//   questions: any[]
//   start_time: string
// }

// export default function AllGamesPage() {
//   const [games, setGames] = useState<Game[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchGames = async () => {
//       try {
//         const response = await fetch('http://localhost:5001/games')
//         const data = await response.json()
//         setGames(data)
//       } catch (error) {
//         console.error('Error fetching games:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchGames()
//   }, [])

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-white">Loading games...</div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-black py-8 px-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-white flex items-center gap-2">
//             <Gamepad2 className="h-8 w-8" />
//             All Quiz Games
//           </h1>
//           <Link href="/create-quiz-game">
//             <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//               Create New Game
//             </Button>
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {games.map((game) => (
//             <Link key={game._id} href={`/play-game/${game._id}`}>
//               <Card className="bg-gray-900 border-gray-800 hover:border-blue-600 transition-colors h-full">
//                 <CardHeader>
//                   <CardTitle className="text-white text-xl">{game.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-2 text-gray-400">
//                       <User className="h-4 w-4" />
//                       <span>Created by {game.createdBy}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-400">
//                       <Clock className="h-4 w-4" />
//                       <span>{new Date(game.start_time).toLocaleString()}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Badge className={`${
//                         game.difficulty === 'easy' ? 'bg-green-600' : 
//                         game.difficulty === 'medium' ? 'bg-yellow-600' : 'bg-red-600'
//                       } text-white`}>
//                         {game.difficulty}
//                       </Badge>
//                       <Badge className="bg-gray-800 text-white">
//                         {game.questions.length} questions
//                       </Badge>
//                     </div>
//                     <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
//                       <Trophy className="mr-2 h-4 w-4" />
//                       Play Now
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Badge } from "../ui/badge"
import { Play, Plus } from "lucide-react"

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

export default function Component() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // ✅ Add router hook

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games/all-games');
        if (!response.ok) {
          throw new Error('Failed to fetch games');
        }
        const data = await response.json();
        setGames(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (loading) {
    return <div className="text-white text-center p-8">Loading games...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-8">Error: {error}</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="bg-black p-6 w-full max-w-7xl">
        <div className="mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Games</h1>
            <Button className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Game
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <Card key={game._id} className="bg-gray-900 border-gray-800 relative">
                
                <Button
                  size="sm"
                  className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white p-2 h-8 w-8"
                  onClick={() => router.push('/play-game')} // ✅ Navigate on click
                >
                  <Play className="h-4 w-4" />
                </Button>

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between pr-12">
                    <h3 className="text-xl font-semibold text-white">{game.name}</h3>
                    <Badge className="bg-gray-800 text-xs">
                      {game.mode}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Difficulty:</span>
                    <Badge variant="secondary" className={`bg-gray-800 ${getDifficultyColor(game.difficulty)} hover:bg-gray-700`}>
                      {game.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Players:</span>
                    <span className="text-white text-sm">{game.max_players}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-gray-400 text-sm">Start date:</div>
                    <div className="text-white text-sm font-medium">{game.startDate}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-gray-400 text-sm">Created by:</div>
                    <div className="text-white text-sm font-medium">{game.createdBy}</div>
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
}
