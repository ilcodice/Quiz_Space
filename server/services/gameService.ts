import Game from '../models/Game';
import Answer from '../models/Answer';
import { calculateScore } from '../utils/gameUtils';

export const createGameWithQuestions = async (userId: string, gameData: any, questions: any[]) => {
  // Implementation...
};

export const submitGameAnswers = async (userId: string, gameId: string, answers: any[]) => {
  // Calculate score
  const score = calculateScore(answers);

  // Save answers
  const answerDocs = answers.map(answer => ({
    user_id: userId,
    game_id: gameId,
    question_id: answer.questionId,
    selected_choice_id: answer.choiceId,
    is_correct: answer.isCorrect,
    score: answer.isCorrect ? 10 : 0 // Example scoring
  }));

  await Answer.insertMany(answerDocs);

  // Update game with final score
  await Game.findByIdAndUpdate(gameId, {
    end_time: new Date(),
    score
  });

  return score;
};