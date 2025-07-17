// "use client"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { ArrowLeft, Trophy } from "lucide-react"
// import { useState } from "react"

// export default function QuizGame() {
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [score, setScore] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
//   const [showResult, setShowResult] = useState(false)
//   const [gameCompleted, setGameCompleted] = useState(false)

//   // Sample quiz data - in real app this would come from props or API
//   const quizData = [
//     {
//       id: 1,
//       question: "What is the capital of France?",
//       choices: [
//         { id: "A", text: "London" },
//         { id: "B", text: "Berlin" },
//         { id: "C", text: "Paris" },
//         { id: "D", text: "Madrid" },
//       ],
//       correctAnswer: "C",
//     },
//     {
//       id: 2,
//       question: "Which planet is known as the Red Planet?",
//       choices: [
//         { id: "A", text: "Venus" },
//         { id: "B", text: "Mars" },
//         { id: "C", text: "Jupiter" },
//         { id: "D", text: "Saturn" },
//       ],
//       correctAnswer: "B",
//     },
//     {
//       id: 3,
//       question: "What is 2 + 2?",
//       choices: [
//         { id: "A", text: "3" },
//         { id: "B", text: "4" },
//         { id: "C", text: "5" },
//         { id: "D", text: "6" },
//       ],
//       correctAnswer: "B",
//     },
//   ]

//   const handleAnswerSelect = (choiceId: string) => {
//     if (showResult) return
//     setSelectedAnswer(choiceId)
//   }

//   const handleSubmitAnswer = () => {
//     if (!selectedAnswer) return

//     setShowResult(true)

//     // Check if answer is correct and update score
//     if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
//       setScore(score + 10)
//     }

//     // Move to next question after 2 seconds
//     setTimeout(() => {
//       if (currentQuestion < quizData.length - 1) {
//         setCurrentQuestion(currentQuestion + 1)
//         setSelectedAnswer(null)
//         setShowResult(false)
//       } else {
//         setGameCompleted(true)
//       }
//     }, 2000)
//   }

//   const resetGame = () => {
//     setCurrentQuestion(0)
//     setScore(0)
//     setSelectedAnswer(null)
//     setShowResult(false)
//     setGameCompleted(false)
//   }

//   if (gameCompleted) {
//     return (
        
//       <div className=" bg-black p-6 flex items-center justify-center">
//         <Card className="bg-gray-900 border-gray-800 w-full max-w-md text-center">
//           <CardContent className="p-8">
//             <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-white mb-4">Game Complete!</h2>
//             <div className="text-4xl font-bold text-green-400 mb-6">{score} Points</div>
//             <div className="text-gray-300 mb-6">
//               You answered {score / 10} out of {quizData.length} questions correctly!
//             </div>
//             <div className="flex gap-4">
//               <Button onClick={resetGame} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white">
//                 Play Again
//               </Button>
//               <Button
//                 variant="outline"
//                 className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
//               >
//                 Exit Game
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
      
//     )
//   }

//   const question = quizData[currentQuestion]

//   return (
//     <div className="min-h-screen bg-black p-6">
//       <div className="mx-auto max-w-4xl">
//         {/* Header with Score */}
//         <div className="mb-8 flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800 p-2">
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <Badge className="bg-gray-800 text-white text-lg px-4 py-2">Score: {score}</Badge>
//           </div>
//           <div className="text-gray-400">
//             Question {currentQuestion + 1} of {quizData.length}
//           </div>
//         </div>

//         {/* Question Card */}
//         <Card className="bg-gray-900 border-gray-800 mb-8">
//           <CardContent className="p-8">
//             <h2 className="text-2xl font-semibold text-white mb-8 leading-relaxed">{question.question}</h2>

//             {/* Answer Choices */}
//             <div className="grid gap-4">
//               {question.choices.map((choice) => {
//                 let buttonClass =
//                   "w-full p-6 text-left bg-gray-800 border-gray-700 text-white hover:bg-gray-700 transition-colors"

//                 if (showResult) {
//                   if (choice.id === question.correctAnswer) {
//                     buttonClass = "w-full p-6 text-left bg-green-800 border-green-600 text-white"
//                   } else if (choice.id === selectedAnswer && choice.id !== question.correctAnswer) {
//                     buttonClass = "w-full p-6 text-left bg-red-800 border-red-600 text-white"
//                   } else {
//                     buttonClass = "w-full p-6 text-left bg-gray-800 border-gray-700 text-gray-400"
//                   }
//                 } else if (selectedAnswer === choice.id) {
//                   buttonClass = "w-full p-6 text-left bg-blue-800 border-blue-600 text-white"
//                 }

//                 return (
//                   <Button
//                     key={choice.id}
//                     variant="outline"
//                     className={buttonClass}
//                     onClick={() => handleAnswerSelect(choice.id)}
//                     disabled={showResult}
//                   >
//                     <div className="flex items-center gap-4">
//                       <span className="font-bold text-lg">{choice.id}.</span>
//                       <span className="text-lg">{choice.text}</span>
//                     </div>
//                   </Button>
//                 )
//               })}
//             </div>

//             {/* Submit Button */}
//             {!showResult && (
//               <div className="mt-8 text-center">
//                 <Button
//                   onClick={handleSubmitAnswer}
//                   disabled={!selectedAnswer}
//                   className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 text-lg"
//                 >
//                   Submit Answer
//                 </Button>
//               </div>
//             )}

//             {/* Result Message */}
//             {showResult && (
//               <div className="mt-8 text-center">
//                 <div
//                   className={`text-xl font-semibold ${
//                     selectedAnswer === question.correctAnswer ? "text-green-400" : "text-red-400"
//                   }`}
//                 >
//                   {selectedAnswer === question.correctAnswer ? "Correct! +10 points" : "Incorrect!"}
//                 </div>
//                 {currentQuestion < quizData.length - 1 ? (
//                   <div className="text-gray-400 mt-2">Next question in 2 seconds...</div>
//                 ) : (
//                   <div className="text-gray-400 mt-2">Calculating final score...</div>
//                 )}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
    
//   )
// }


// "use client"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { ArrowLeft, Trophy } from "lucide-react"
// import { useState } from "react"

// export default function QuizGame() {
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [score, setScore] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
//   const [showResult, setShowResult] = useState(false)
//   const [gameCompleted, setGameCompleted] = useState(false)

//   // Sample quiz data - in real app this would come from props or API
//   const quizData = [
//     {
//       id: 1,
//       question: "What is the capital of France?",
//       choices: [
//         { id: "A", text: "London" },
//         { id: "B", text: "Berlin" },
//         { id: "C", text: "Paris" },
//         { id: "D", text: "Madrid" },
//       ],
//       correctAnswer: "C",
//     },
//     {
//       id: 2,
//       question: "Which planet is known as the Red Planet?",
//       choices: [
//         { id: "A", text: "Venus" },
//         { id: "B", text: "Mars" },
//         { id: "C", text: "Jupiter" },
//         { id: "D", text: "Saturn" },
//       ],
//       correctAnswer: "B",
//     },
//     {
//       id: 3,
//       question: "What is 2 + 2?",
//       choices: [
//         { id: "A", text: "3" },
//         { id: "B", text: "4" },
//         { id: "C", text: "5" },
//         { id: "D", text: "6" },
//       ],
//       correctAnswer: "B",
//     },
//   ]

//   const handleAnswerSelect = (choiceId: string) => {
//     if (showResult) return
//     setSelectedAnswer(choiceId)
//   }

//   const handleSubmitAnswer = () => {
//     if (!selectedAnswer) return

//     setShowResult(true)

//     // Check if answer is correct and update score
//     if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
//       setScore(score + 10)
//     }

//     // Move to next question after 2 seconds
//     setTimeout(() => {
//       if (currentQuestion < quizData.length - 1) {
//         setCurrentQuestion(currentQuestion + 1)
//         setSelectedAnswer(null)
//         setShowResult(false)
//       } else {
//         setGameCompleted(true)
//       }
//     }, 2000)
//   }

//   const resetGame = () => {
//     setCurrentQuestion(0)
//     setScore(0)
//     setSelectedAnswer(null)
//     setShowResult(false)
//     setGameCompleted(false)
//   }

//   if (gameCompleted) {
//     return (
        
//       <div className=" bg-black p-6 flex items-center justify-center">
//         <Card className="bg-gray-900 border-gray-800 w-full max-w-md text-center">
//           <CardContent className="p-8">
//             <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-white mb-4">Game Complete!</h2>
//             <div className="text-4xl font-bold text-green-400 mb-6">{score} Points</div>
//             <div className="text-gray-300 mb-6">
//               You answered {score / 10} out of {quizData.length} questions correctly!
//             </div>
//             <div className="flex gap-4">
//               <Button onClick={resetGame} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white">
//                 Play Again
//               </Button>
//               <Button
//                 variant="outline"
//                 className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
//               >
//                 Exit Game
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
      
//     )
//   }

//   const question = quizData[currentQuestion]

//   return (
//     <div className="min-h-screen bg-black p-6">
//       <div className="mx-auto max-w-4xl">
//         {/* Header with Score */}
//         <div className="mb-8 flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800 p-2">
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <Badge className="bg-gray-800 text-white text-lg px-4 py-2">Score: {score}</Badge>
//           </div>
//           <div className="text-gray-400">
//             Question {currentQuestion + 1} of {quizData.length}
//           </div>
//         </div>

//         {/* Question Card */}
//         <Card className="bg-gray-900 border-gray-800 mb-8">
//           <CardContent className="p-8">
//             <h2 className="text-2xl font-semibold text-white mb-8 leading-relaxed">{question.question}</h2>

//             {/* Answer Choices */}
//             <div className="grid gap-4">
//               {question.choices.map((choice) => {
//                 let buttonClass =
//                   "w-full p-6 text-left bg-gray-800 border-gray-700 text-white hover:bg-gray-700 transition-colors"

//                 if (showResult) {
//                   if (choice.id === question.correctAnswer) {
//                     buttonClass = "w-full p-6 text-left bg-green-800 border-green-600 text-white"
//                   } else if (choice.id === selectedAnswer && choice.id !== question.correctAnswer) {
//                     buttonClass = "w-full p-6 text-left bg-red-800 border-red-600 text-white"
//                   } else {
//                     buttonClass = "w-full p-6 text-left bg-gray-800 border-gray-700 text-gray-400"
//                   }
//                 } else if (selectedAnswer === choice.id) {
//                   buttonClass = "w-full p-6 text-left bg-blue-800 border-blue-600 text-white"
//                 }

//                 return (
//                   <Button
//                     key={choice.id}
//                     variant="outline"
//                     className={buttonClass}
//                     onClick={() => handleAnswerSelect(choice.id)}
//                     disabled={showResult}
//                   >
//                     <div className="flex items-center gap-4">
//                       <span className="font-bold text-lg">{choice.id}.</span>
//                       <span className="text-lg">{choice.text}</span>
//                     </div>
//                   </Button>
//                 )
//               })}
//             </div>

//             {/* Submit Button */}
//             {!showResult && (
//               <div className="mt-8 text-center">
//                 <Button
//                   onClick={handleSubmitAnswer}
//                   disabled={!selectedAnswer}
//                   className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 text-lg"
//                 >
//                   Submit Answer
//                 </Button>
//               </div>
//             )}

//             {/* Result Message */}
//             {showResult && (
//               <div className="mt-8 text-center">
//                 <div
//                   className={`text-xl font-semibold ${
//                     selectedAnswer === question.correctAnswer ? "text-green-400" : "text-red-400"
//                   }`}
//                 >
//                   {selectedAnswer === question.correctAnswer ? "Correct! +10 points" : "Incorrect!"}
//                 </div>
//                 {currentQuestion < quizData.length - 1 ? (
//                   <div className="text-gray-400 mt-2">Next question in 2 seconds...</div>
//                 ) : (
//                   <div className="text-gray-400 mt-2">Calculating final score...</div>
//                 )}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
    
//   )
// }


"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy } from "lucide-react";

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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch("/api/questions");
      const data = await res.json();
      setQuestions(data.slice(0, 10)); // Limit to 10
    };

    fetchQuestions();
  }, []);

  if (questions.length === 0) {
    return <div className="text-center p-8 text-white">Loading questions...</div>;
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
      <div className="bg-black p-6 flex items-center justify-center">
        <Card className="bg-gray-900 border-gray-800 w-full max-w-md text-center">
          <CardContent className="p-8">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Game Complete!</h2>
            <div className="text-4xl font-bold text-green-400 mb-6">{score} Points</div>
            <div className="text-gray-300 mb-6">
              You answered {score / 10} out of {questions.length} questions correctly!
            </div>
            <div className="flex gap-4">
              <Button onClick={resetGame} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white">
                Play Again
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
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
            <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800 p-2">
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
