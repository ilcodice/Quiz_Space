// "use client"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { ArrowLeft, Calendar, CheckCircle, Clock } from "lucide-react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { toast } from "sonner"

// interface QuizFormData {
//   difficulty: string
//   question: string
//   choice1: string
//   choice2: string
//   choice3: string
//   choice4: string
//   correctAnswer: string
//   startDate: string
//   startTime: string
//   name?: string
//   createdBy?: string
// }

// export default function CreateQuizGame() {
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [formData, setFormData] = useState<QuizFormData>({
//     difficulty: "",
//     question: "",
//     choice1: "",
//     choice2: "",
//     choice3: "",
//     choice4: "",
//     correctAnswer: "",
//     startDate: "",
//     startTime: "",
//     name: "Quiz Game", // Default name or get from user input
//     createdBy: "Current User" // Replace with actual user
//   })

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       // 1. Prepare the game data
//       const gameData = {
//         mode: "solo", // or get from form
//         user_id: "current_user_id", // replace with actual user ID
//         start_time: new Date(`${formData.startDate}T${formData.startTime}`),
//         max_players: 1, // or get from form
//         name: formData.name || "Quiz Game",
//         difficulty: formData.difficulty,
//         startDate: new Date(`${formData.startDate}T${formData.startTime}`).toLocaleString(),
//         createdBy: "Current User" // replace with actual username
//       };
  
//       // 2. First create the game
//       const gameResponse = await fetch('/api/games', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(gameData)
//       });
  
//       if (!gameResponse.ok) {
//         throw new Error('Failed to create game');
//       }
  
//       const game = await gameResponse.json();
  
//       // 3. Then create the question
//       const questionData = {
//         text: formData.question,
//         choices: {
//           a: formData.choice1,
//           b: formData.choice2,
//           c: formData.choice3,
//           d: formData.choice4
//         },
//         correctAnswer: formData.correctAnswer.replace('choice', '').toLowerCase(), // converts "choice1" to "a"
//         game_id: game._id
//       };
  
//       const questionResponse = await fetch('/api/questions', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(questionData)
//       });
  
//       if (!questionResponse.ok) {
//         // Rollback game creation if question fails
//         await fetch(`/api/games/${game._id}`, { method: 'DELETE' });
//         throw new Error('Failed to create question');
//       }
  
//       const question = await questionResponse.json();
  
//       // 4. Update game with question reference
//       const updateResponse = await fetch(`/api/games/${game._id}/questions`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ questionId: question._id })
//       });
  
//       if (!updateResponse.ok) {
//         throw new Error('Failed to link question to game');
//       }
  
//       toast.success("Quiz game created successfully!");
//       router.push('/games');
//     } catch (error: any) {
//       console.error("Creation error:", error);
//       toast.error(`Failed to create quiz: ${error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleInputChange = (field: keyof QuizFormData, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const choices = [
//     { key: "choice1", label: "Choice A" },
//     { key: "choice2", label: "Choice B" },
//     { key: "choice3", label: "Choice C" },
//     { key: "choice4", label: "Choice D" },
//   ]

//   return (
//     <div className="flex justify-center align-center bg-black/50">
//       <div className="w-[700px] bg-black px-9 py-4">
//         <div className="mx-auto max-w-2xl">
//           {/* Header */}
//           <div className="mb-8 flex items-center gap-4">
//             <Button 
//               variant="ghost" 
//               className="text-gray-400 hover:text-white hover:bg-gray-800 p-2"
//               onClick={() => router.back()}
//             >
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <h1 className="text-3xl font-bold text-white">Create Quiz Game</h1>
//           </div>

//           {/* Create Quiz Form */}
//           <Card className="bg-gray-900 border-gray-800">
//             <CardHeader>
//               <CardTitle className="text-white text-xl">Quiz Details</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Game Name (optional) */}
//                 <div className="space-y-2">
//                   <Label htmlFor="name" className="text-gray-300">
//                     Game Name
//                   </Label>
//                   <Input
//                     id="name"
//                     value={formData.name}
//                     onChange={(e) => handleInputChange("name", e.target.value)}
//                     placeholder="Enter game name"
//                     className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
//                   />
//                 </div>

//                 {/* Difficulty */}
//                 <div className="space-y-2">
//                   <Label htmlFor="difficulty" className="text-gray-300">
//                     Difficulty Level
//                   </Label>
//                   <Select 
//                     value={formData.difficulty} 
//                     onValueChange={(value) => handleInputChange("difficulty", value)}
//                     required
//                   >
//                     <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
//                       <SelectValue placeholder="Select difficulty" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-gray-800 border-gray-700">
//                       <SelectItem value="easy" className="text-white hover:bg-gray-700">
//                         Easy
//                       </SelectItem>
//                       <SelectItem value="medium" className="text-white hover:bg-gray-700">
//                         Medium
//                       </SelectItem>
//                       <SelectItem value="hard" className="text-white hover:bg-gray-700">
//                         Hard
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Question */}
//                 <div className="space-y-2">
//                   <Label htmlFor="question" className="text-gray-300">
//                     Question
//                   </Label>
//                   <Textarea
//                     id="question"
//                     value={formData.question}
//                     onChange={(e) => handleInputChange("question", e.target.value)}
//                     placeholder="Enter your quiz question here..."
//                     className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 min-h-[100px]"
//                     required
//                   />
//                 </div>

//                 {/* Multiple Choice Answers */}
//                 <div className="space-y-4">
//                   <Label className="text-gray-300">Answer Choices</Label>
//                   <div className="grid gap-4">
//                     {choices.map((choice) => (
//                       <div key={choice.key} className="space-y-2">
//                         <Label htmlFor={choice.key} className="text-gray-400 text-sm">
//                           {choice.label}
//                         </Label>
//                         <Input
//                           id={choice.key}
//                           value={formData[choice.key as keyof QuizFormData]}
//                           onChange={(e) => handleInputChange(choice.key as keyof QuizFormData, e.target.value)}
//                           placeholder={`Enter ${choice.label.toLowerCase()}`}
//                           className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
//                           required
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Correct Answer */}
//                 <div className="space-y-2">
//                   <Label htmlFor="correctAnswer" className="text-gray-300 flex items-center gap-2">
//                     <CheckCircle className="h-4 w-4" />
//                     Correct Answer
//                   </Label>
//                   <Select
//                     value={formData.correctAnswer}
//                     onValueChange={(value) => handleInputChange("correctAnswer", value)}
//                     required
//                   >
//                     <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
//                       <SelectValue placeholder="Select the correct answer" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-gray-800 border-gray-700">
//                       {choices.map((choice) => (
//                         <SelectItem 
//                           key={choice.key} 
//                           value={choice.key}
//                           className="text-white hover:bg-gray-700"
//                           disabled={!formData[choice.key as keyof QuizFormData]}
//                         >
//                           {choice.label} {formData[choice.key as keyof QuizFormData] ? `(${formData[choice.key as keyof QuizFormData]})` : ''}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Start Date and Time */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="startDate" className="text-gray-300 flex items-center gap-2">
//                       <Calendar className="h-4 w-4" />
//                       Start Date
//                     </Label>
//                     <Input
//                       id="startDate"
//                       type="date"
//                       value={formData.startDate}
//                       onChange={(e) => handleInputChange("startDate", e.target.value)}
//                       className="bg-gray-800 border-gray-700 text-white focus:border-gray-600"
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="startTime" className="text-gray-300 flex items-center gap-2">
//                       <Clock className="h-4 w-4" />
//                       Start Time
//                     </Label>
//                     <Input
//                       id="startTime"
//                       type="time"
//                       value={formData.startTime}
//                       onChange={(e) => handleInputChange("startTime", e.target.value)}
//                       className="bg-gray-800 border-gray-700 text-white focus:border-gray-600"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-4 pt-4">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
//                     onClick={() => router.back()}
//                   >
//                     Cancel
//                   </Button>
//                   <Button 
//                     type="submit" 
//                     className="flex-1 bg-gray-800 hover:bg-gray-700 text-white"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? "Creating..." : "Create Quiz Game"}
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>

//           {/* Preview Section */}
//           {formData.question && (
//             <Card className="mt-6 bg-gray-900 border-gray-800">
//               <CardHeader>
//                 <CardTitle className="text-white text-lg">Preview</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="text-white font-medium">{formData.question}</div>
//                   <div className="grid gap-2">
//                     {choices.map((choice) => {
//                       const choiceValue = formData[choice.key as keyof QuizFormData]
//                       const isCorrect = formData.correctAnswer === choice.key
//                       return (
//                         choiceValue && (
//                           <div
//                             key={choice.key}
//                             className={`p-3 rounded border ${
//                               isCorrect
//                                 ? "border-green-600 bg-green-900/20 text-green-400"
//                                 : "border-gray-700 bg-gray-800 text-gray-300"
//                             }`}
//                           >
//                             <span className="font-medium">{choice.label}:</span> {choiceValue}
//                             {isCorrect && <CheckCircle className="inline ml-2 h-4 w-4" />}
//                           </div>
//                         )
//                       )
//                     })}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { ArrowLeft, Calendar, CheckCircle, Clock } from "lucide-react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { toast } from "sonner"

// interface QuestionData {
//   difficulty: string
//   question: string
//   choice1: string
//   choice2: string
//   choice3: string
//   choice4: string
//   correctAnswer: string
// }

// interface QuizFormData {
//   name?: string
//   createdBy?: string
//   startDate: string
//   startTime: string
//   questions: QuestionData[]
// }

// export default function CreateQuizGame() {
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  
//   const [formData, setFormData] = useState<QuizFormData>({
//     startDate: "",
//     startTime: "",
//     name: "Quiz Game",
//     createdBy: "Current User",
//     questions: [
//       {
//         difficulty: "",
//         question: "",
//         choice1: "",
//         choice2: "",
//         choice3: "",
//         choice4: "",
//         correctAnswer: "",
//       }
//     ]
//   })

//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setIsSubmitting(true);
  
//   try {
//     // Prepare game data with proper date formatting
//     const startTime = new Date(`${formData.startDate}T${formData.startTime}`);
    
//     if (isNaN(startTime.getTime())) {
//       throw new Error('Invalid date/time format');
//     }

//     const gameData = {
//       mode: "solo",
//       user_id: "current_user_id", // TODO: Replace with actual user ID from auth
//       start_time: startTime.toISOString(),
//       max_players: 1,
//       name: formData.name || "Quiz Game",
//       difficulty: formData.questions[0].difficulty,
//       createdBy: "Current User" // TODO: Replace with actual username
//     };

//     console.log('Sending game data:', gameData);
//     const gameResponse = await fetch(`${API_BASE_URL}/games`, {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       },
//       body: JSON.stringify(gameData)
//     });

//     // Handle non-JSON responses
//     const contentType = gameResponse.headers.get('content-type');
//     if (!contentType || !contentType.includes('application/json')) {
//       const text = await gameResponse.text();
//       throw new Error(`Expected JSON, got: ${text.substring(0, 100)}`);
//     }

//     const responseData = await gameResponse.json();
    
//     if (!gameResponse.ok) {
//       throw new Error(responseData.message || 'Game creation failed');
//     }

//     // If game was created successfully, now create questions
//     const gameId = responseData._id;
//     const questionCreationPromises = formData.questions.map(async (question, index) => {
//       const questionData = {
//         text: question.question,
//         choices: {
//           a: question.choice1,
//           b: question.choice2,
//           c: question.choice3,
//           d: question.choice4
//         },
//         correctAnswer: question.correctAnswer.replace('choice', '').toLowerCase(), // converts "choice1" to "a"
//         game_id: gameId
//       };

//       const questionResponse = await fetch(`${API_BASE_URL}/questions`, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(questionData)
//       });

//       if (!questionResponse.ok) {
//         throw new Error(`Failed to create question ${index + 1}`);
//       }

//       return questionResponse.json();
//     });

//     // Wait for all questions to be created
//     await Promise.all(questionCreationPromises);

//     toast.success(`Quiz game created successfully with ${formData.questions.length} questions!`);
//     router.push('/games');

//   } catch (error: any) {
//     console.error('Full error:', {
//       name: error.name,
//       message: error.message,
//       stack: error.stack
//     });
//     toast.error(error.message || 'Failed to create game');
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   const handleInputChange = (field: keyof QuestionData, value: string) => {
//     setFormData(prev => {
//       const updatedQuestions = [...prev.questions];
//       updatedQuestions[currentQuestionIndex] = {
//         ...updatedQuestions[currentQuestionIndex],
//         [field]: value
//       };
//       return {
//         ...prev,
//         questions: updatedQuestions
//       };
//     })
//   }

//   const handleGlobalInputChange = (field: keyof QuizFormData, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }))
//   }

//   const addNewQuestion = () => {
//     if (formData.questions.length >= 10) {
//       toast.warning("Maximum of 10 questions reached");
//       return;
//     }
    
//     setFormData(prev => ({
//       ...prev,
//       questions: [
//         ...prev.questions,
//         {
//           difficulty: prev.questions[currentQuestionIndex].difficulty || "",
//           question: "",
//           choice1: "",
//           choice2: "",
//           choice3: "",
//           choice4: "",
//           correctAnswer: "",
//         }
//       ]
//     }));
//     setCurrentQuestionIndex(formData.questions.length);
//   }

//   const navigateToQuestion = (index: number) => {
//     setCurrentQuestionIndex(index);
//   }

//   const removeQuestion = (index: number) => {
//     if (formData.questions.length <= 1) {
//       toast.warning("You must have at least one question");
//       return;
//     }
    
//     setFormData(prev => {
//       const updatedQuestions = prev.questions.filter((_, i) => i !== index);
//       return {
//         ...prev,
//         questions: updatedQuestions
//       };
//     });
    
//     if (currentQuestionIndex >= index) {
//       setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
//     }
//   }

//   const choices = [
//     { key: "choice1", label: "Choice A" },
//     { key: "choice2", label: "Choice B" },
//     { key: "choice3", label: "Choice C" },
//     { key: "choice4", label: "Choice D" },
//   ]

//   const currentQuestion = formData.questions[currentQuestionIndex];

//   return (
//     <div className="flex justify-center align-center bg-black/50">
//       <div className="w-[700px] bg-black px-9 py-4">
//         <div className="mx-auto max-w-2xl">
//           {/* Header */}
//           <div className="mb-8 flex items-center gap-4">
//             <Button 
//               variant="ghost" 
//               className="text-gray-400 hover:text-white hover:bg-gray-800 p-2"
//               onClick={() => router.back()}
//             >
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <h1 className="text-3xl font-bold text-white">Create Quiz Game</h1>
//           </div>

//           {/* Question Navigation */}
//           <div className="mb-6">
//             <div className="flex flex-wrap gap-2">
//               {formData.questions.map((_, index) => (
//                 <Button
//                   key={index}
//                   variant={currentQuestionIndex === index ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => navigateToQuestion(index)}
//                   className={`${currentQuestionIndex === index ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
//                 >
//                   Q{index + 1}
//                 </Button>
//               ))}
//               {formData.questions.length < 10 && (
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={addNewQuestion}
//                   className="bg-green-600 hover:bg-green-700 text-white"
//                 >
//                   + Add Question
//                 </Button>
//               )}
//             </div>
//             {formData.questions.length > 1 && (
//               <div className="mt-2 text-sm text-gray-400">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => removeQuestion(currentQuestionIndex)}
//                   className="text-red-500 hover:text-red-600"
//                 >
//                   Remove Current Question
//                 </Button>
//               </div>
//             )}
//           </div>

//           {/* Create Quiz Form */}
//           <Card className="bg-gray-900 border-gray-800">
//             <CardHeader>
//               <CardTitle className="text-white text-xl">
//                 Question {currentQuestionIndex + 1} of {formData.questions.length}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Game Name (optional) */}
//                 <div className="space-y-2">
//                   <Label htmlFor="name" className="text-gray-300">
//                     Game Name
//                   </Label>
//                   <Input
//                     id="name"
//                     value={formData.name}
//                     onChange={(e) => handleGlobalInputChange("name", e.target.value)}
//                     placeholder="Enter game name"
//                     className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
//                   />
//                 </div>

//                 {/* Difficulty */}
//                 <div className="space-y-2">
//                   <Label htmlFor="difficulty" className="text-gray-300">
//                     Difficulty Level
//                   </Label>
//                   <Select 
//                     value={currentQuestion.difficulty} 
//                     onValueChange={(value) => handleInputChange("difficulty", value)}
//                     required
//                   >
//                     <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
//                       <SelectValue placeholder="Select difficulty" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-gray-800 border-gray-700">
//                       <SelectItem value="easy" className="text-white hover:bg-gray-700">
//                         Easy
//                       </SelectItem>
//                       <SelectItem value="medium" className="text-white hover:bg-gray-700">
//                         Medium
//                       </SelectItem>
//                       <SelectItem value="hard" className="text-white hover:bg-gray-700">
//                         Hard
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Question */}
//                 <div className="space-y-2">
//                   <Label htmlFor="question" className="text-gray-300">
//                     Question
//                   </Label>
//                   <Textarea
//                     id="question"
//                     value={currentQuestion.question}
//                     onChange={(e) => handleInputChange("question", e.target.value)}
//                     placeholder="Enter your quiz question here..."
//                     className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 min-h-[100px]"
//                     required
//                   />
//                 </div>

//                 {/* Multiple Choice Answers */}
//                 <div className="space-y-4">
//                   <Label className="text-gray-300">Answer Choices</Label>
//                   <div className="grid gap-4">
//                     {choices.map((choice) => (
//                       <div key={choice.key} className="space-y-2">
//                         <Label htmlFor={choice.key} className="text-gray-400 text-sm">
//                           {choice.label}
//                         </Label>
//                         <Input
//                           id={choice.key}
//                           value={currentQuestion[choice.key as keyof QuestionData]}
//                           onChange={(e) => handleInputChange(choice.key as keyof QuestionData, e.target.value)}
//                           placeholder={`Enter ${choice.label.toLowerCase()}`}
//                           className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
//                           required
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Correct Answer */}
//                 <div className="space-y-2">
//                   <Label htmlFor="correctAnswer" className="text-gray-300 flex items-center gap-2">
//                     <CheckCircle className="h-4 w-4" />
//                     Correct Answer
//                   </Label>
//                   <Select
//                     value={currentQuestion.correctAnswer}
//                     onValueChange={(value) => handleInputChange("correctAnswer", value)}
//                     required
//                   >
//                     <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
//                       <SelectValue placeholder="Select the correct answer" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-gray-800 border-gray-700">
//                       {choices.map((choice) => (
//                         <SelectItem 
//                           key={choice.key} 
//                           value={choice.key}
//                           className="text-white hover:bg-gray-700"
//                           disabled={!currentQuestion[choice.key as keyof QuestionData]}
//                         >
//                           {choice.label} {currentQuestion[choice.key as keyof QuestionData] ? `(${currentQuestion[choice.key as keyof QuestionData]})` : ''}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Start Date and Time */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="startDate" className="text-gray-300 flex items-center gap-2">
//                       <Calendar className="h-4 w-4" />
//                       Start Date
//                     </Label>
//                     <Input
//                       id="startDate"
//                       type="date"
//                       value={formData.startDate}
//                       onChange={(e) => handleGlobalInputChange("startDate", e.target.value)}
//                       className="bg-gray-800 border-gray-700 text-white focus:border-gray-600"
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="startTime" className="text-gray-300 flex items-center gap-2">
//                       <Clock className="h-4 w-4" />
//                       Start Time
//                     </Label>
//                     <Input
//                       id="startTime"
//                       type="time"
//                       value={formData.startTime}
//                       onChange={(e) => handleGlobalInputChange("startTime", e.target.value)}
//                       className="bg-gray-800 border-gray-700 text-white focus:border-gray-600"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-4 pt-4">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
//                     onClick={() => router.back()}
//                   >
//                     Cancel
//                   </Button>
//                   <Button 
//                     type="submit" 
//                     className="flex-1 bg-gray-800 hover:bg-gray-700 text-white"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? "Creating..." : "Create Quiz Game"}
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>

//           {/* Preview Section */}
//           {currentQuestion.question && (
//             <Card className="mt-6 bg-gray-900 border-gray-800">
//               <CardHeader>
//                 <CardTitle className="text-white text-lg">Preview (Question {currentQuestionIndex + 1})</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="text-white font-medium">{currentQuestion.question}</div>
//                   <div className="grid gap-2">
//                     {choices.map((choice) => {
//                       const choiceValue = currentQuestion[choice.key as keyof QuestionData]
//                       const isCorrect = currentQuestion.correctAnswer === choice.key
//                       return (
//                         choiceValue && (
//                           <div
//                             key={choice.key}
//                             className={`p-3 rounded border ${
//                               isCorrect
//                                 ? "border-green-600 bg-green-900/20 text-green-400"
//                                 : "border-gray-700 bg-gray-800 text-gray-300"
//                             }`}
//                           >
//                             <span className="font-medium">{choice.label}:</span> {choiceValue}
//                             {isCorrect && <CheckCircle className="inline ml-2 h-4 w-4" />}
//                           </div>
//                         )
//                       )
//                     })}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
  


//   )
// }



"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { ArrowLeft, CheckCircle, Calendar, Clock } from 'lucide-react';

export default function CreateQuizGame() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    startDate: new Date().toISOString().split('T')[0],
    startTime: '12:00',
    questions: Array(10).fill({
      question: '',
      difficulty: 'medium',
      a: '',
      b: '',
      c: '',
      d: '',
      correctAnswer: 'a',
    }),
  });

  const choices = [
    { key: 'a', label: 'Option A' },
    { key: 'b', label: 'Option B' },
    { key: 'c', label: 'Option C' },
    { key: 'd', label: 'Option D' },
  ];

  const currentQuestion = formData.questions[currentQuestionIndex];

  const navigateToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const addNewQuestion = () => {
    if (formData.questions.length < 10) {
      setFormData({
        ...formData,
        questions: [
          ...formData.questions,
          {
            question: '',
            difficulty: 'medium',
            a: '',
            b: '',
            c: '',
            d: '',
            correctAnswer: 'a',
          },
        ],
      });
      setCurrentQuestionIndex(formData.questions.length);
    }
  };

  const removeQuestion = (index: number) => {
    if (formData.questions.length > 1) {
      const newQuestions = [...formData.questions];
      newQuestions.splice(index, 1);
      setFormData({
        ...formData,
        questions: newQuestions,
      });
      setCurrentQuestionIndex(Math.min(index, newQuestions.length - 1));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    const newQuestions = [...formData.questions];
    newQuestions[currentQuestionIndex] = {
      ...newQuestions[currentQuestionIndex],
      [field]: value,
    };
    setFormData({
      ...formData,
      questions: newQuestions,
    });
  };

  const handleGlobalInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // Filter out questions without a question text or empty required fields
      const filteredQuestions = formData.questions.filter(q => 
        q.question.trim() !== '' &&
        q.a.trim() !== '' &&
        q.b.trim() !== '' &&
        q.c.trim() !== '' &&
        q.d.trim() !== ''
      );
  
      if (filteredQuestions.length === 0) {
        alert('Please add at least one fully completed question.');
        setIsSubmitting(false);
        return;
      }
  
      const response = await fetch('http://localhost:5001/games/create-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameDetails: {
            name: formData.name,
            difficulty: filteredQuestions[0].difficulty,
            startDate: formData.startDate,
            startTime: formData.startTime,
          },
          questions: filteredQuestions,
        }),
      });
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Unexpected response: ${text}`);
      }
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error('Backend error details:', data);
        throw new Error(
          data.message || 
          data.error || 
          `Failed to create quiz (status ${response.status})`
        );
      }
  
      router.push(`/quiz/${data.game._id}`);
  
    } catch (err) {
      console.error('Full error details:', err);
      alert(err.message || 'Failed to create quiz. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="flex justify-center align-center bg-black/50 min-h-screen py-8">
      <div className="w-[700px] bg-black px-9 py-4 rounded-lg">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8 flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-gray-400 hover:text-white hover:bg-gray-800 p-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold text-white">Create Quiz Game</h1>
          </div>

          {/* Question Navigation */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {formData.questions.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestionIndex === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => navigateToQuestion(index)}
                  className={`${currentQuestionIndex === index ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
                >
                  Q{index + 1}
                </Button>
              ))}
              {formData.questions.length < 10 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addNewQuestion}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  + Add Question
                </Button>
              )}
            </div>
            {formData.questions.length > 1 && (
              <div className="mt-2 text-sm text-gray-400">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeQuestion(currentQuestionIndex)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove Current Question
                </Button>
              </div>
            )}
          </div>

          {/* Create Quiz Form */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-xl">
                Question {currentQuestionIndex + 1} of {formData.questions.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Game Name (optional) */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Game Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleGlobalInputChange("name", e.target.value)}
                    placeholder="Enter game name"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
                  />
                </div>

                {/* Difficulty */}
                <div className="space-y-2">
                  <Label htmlFor="difficulty" className="text-gray-300">
                    Difficulty Level
                  </Label>
                  <Select 
                    value={currentQuestion.difficulty} 
                    onValueChange={(value) => handleInputChange("difficulty", value)}
                    required
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="easy" className="text-white hover:bg-gray-700">
                        Easy
                      </SelectItem>
                      <SelectItem value="medium" className="text-white hover:bg-gray-700">
                        Medium
                      </SelectItem>
                      <SelectItem value="hard" className="text-white hover:bg-gray-700">
                        Hard
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Question */}
                <div className="space-y-2">
                  <Label htmlFor="question" className="text-gray-300">
                    Question
                  </Label>
                  <Textarea
                    id="question"
                    value={currentQuestion.question}
                    onChange={(e) => handleInputChange("question", e.target.value)}
                    placeholder="Enter your quiz question here..."
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 min-h-[100px]"
                    required
                  />
                </div>

                {/* Multiple Choice Answers */}
                <div className="space-y-4">
                  <Label className="text-gray-300">Answer Choices</Label>
                  <div className="grid gap-4">
                    {choices.map((choice) => (
                      <div key={choice.key} className="space-y-2">
                        <Label htmlFor={choice.key} className="text-gray-400 text-sm">
                          {choice.label}
                        </Label>
                        <Input
                          id={choice.key}
                          value={currentQuestion[choice.key as keyof typeof currentQuestion]}
                          onChange={(e) => handleInputChange(choice.key, e.target.value)}
                          placeholder={`Enter ${choice.label.toLowerCase()}`}
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Correct Answer */}
                <div className="space-y-2">
                  <Label htmlFor="correctAnswer" className="text-gray-300 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Correct Answer
                  </Label>
                  <Select
                    value={currentQuestion.correctAnswer}
                    onValueChange={(value) => handleInputChange("correctAnswer", value)}
                    required
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select the correct answer" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {choices.map((choice) => (
                        <SelectItem 
                          key={choice.key} 
                          value={choice.key}
                          className="text-white hover:bg-gray-700"
                        >
                          {choice.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Start Date and Time */}
                <div className="flex gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="startDate" className="text-gray-300 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Start Date
                    </Label>
                    <Input
                      type="date"
                      id="startDate"
                      value={formData.startDate}
                      onChange={(e) => handleGlobalInputChange("startDate", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
                      required
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="startTime" className="text-gray-300 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Start Time
                    </Label>
                    <Input
                      type="time"
                      id="startTime"
                      value={formData.startTime}
                      onChange={(e) => handleGlobalInputChange("startTime", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
                      required
                    />
                  </div>
                </div>

                {/* Submit */}
                <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
                  {isSubmitting ? 'Creating...' : 'Create Quiz Game'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
