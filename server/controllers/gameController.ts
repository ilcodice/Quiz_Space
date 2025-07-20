import { Request, Response, NextFunction } from 'express';
import Game from '../models/Game';
import Question from '../models/Question';
import Answer from '../models/Answer';
import { ApiFeatures } from '../utils/apiFeatures';

export const createGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameDetails, questions } = req.body;
const { difficulty, startDate, startTime } = gameDetails;

    
    const game = await Game.create({
      user_id: req.user._id,
      mode,
      difficulty,
      startTime: new Date(),
      startDate: new Date().toISOString()
    });

    // Create questions for the game
    const createdQuestions = await Question.insertMany(
      questions.map((q: any) => ({
        ...q,
        game_id: game._id
      }))
    );

    res.status(201).json({
      status: 'success',
      data: {
        game,
        questions: createdQuestions
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getGameHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const features = new ApiFeatures(
      Game.find({ user_id: req.user._id }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const games = await features.query;

    res.status(200).json({
      status: 'success',
      results: games.length,
      data: games
    });
  } catch (error) {
    next(error);
  }
};

// Add other game controller methods...