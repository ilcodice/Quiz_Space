"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';
import { ArrowLeft, CheckCircle, Calendar, Clock } from 'lucide-react';

export default function CreateQuizGame() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    startDate: new Date().toISOString().split('T')[0],
    start_time: '12:00',
    mode: 'quiz',
    difficulty: 'medium',
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
  
      console.log('Submitting:', {
        gameDetails: {
          name: formData.name,
          difficulty: filteredQuestions[0].difficulty,
          startDate: formData.startDate,
          start_time: formData.start_time, 
          mode: 'quiz',
        },
        questions: filteredQuestions
      });
      
  
      const response = await fetch('http://localhost:5001/api/games/create-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          gameDetails: {
            name: formData.name,
            difficulty: filteredQuestions[0].difficulty,
            startDate: formData.startDate,
            start_time: formData.start_time,
            mode: formData.mode,
          },
          questions: filteredQuestions,
        }),
      });
  
      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json') 
        ? await response.json() 
        : await response.text();
  
      if (!response.ok) {
        console.error('Full error response:', {
          status: response.status,
          statusText: response.statusText,
          data
        });
        throw new Error(
          data.message || 
          data.error || 
          `Failed to create quiz (status ${response.status})`
        );
      }
  
      router.push(`/all-games`);
    } catch (err) {
      console.error('Full error:', err);
      alert(err instanceof Error ? err.message : 'Unknown error occurred');
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
                      value={formData.start_time}
                      onChange={(e) => handleGlobalInputChange("start_time", e.target.value)}
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
