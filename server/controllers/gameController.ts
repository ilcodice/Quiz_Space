import express from 'express';
const { Request, Response } = express;
import Game from '../models/Game.ts';
import Question from '../models/Question.ts';
import Answer from '../models/Answer.ts';
import ApiFeatures from '../utils/apiFeatures.ts';

export const createGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Request body:', req.body);
    const { gameDetails, questions } = req.body;
    const { name, mode, difficulty, startDate, start_time } = gameDetails;

    const startDateTime = new Date(`${startDate}T${start_time}`);
    console.log('Parsed startDateTime:', startDateTime);

    console.log('Creating game with:', { 
      user: req.user._id,
      name,
      mode,
      difficulty,
      startDate,
      start_time: startDateTime
    });

    const game = await Game.create({
      user_id: req.user._id,
      name,
      mode,
      difficulty,
      start_time: startDateTime,
      startDate,
    });

    console.log('Game created:', game);

    const createdQuestions = await Question.insertMany(
      questions.map((q: any) => ({
        game_id: game._id,
        text: q.question,
        difficulty: q.difficulty,
        choices: {
          a: q.a,
          b: q.b,
          c: q.c,
          d: q.d
        },
        correctAnswer: q.correctAnswer
      }))
    );

    console.log('Questions created:', createdQuestions.length);

    res.status(201).json({
      status: 'success',
      data: {
        game,
        questions: createdQuestions
      }
    });
  } catch (error) {
    console.error('Detailed error:', error);
    next(error);
  }
};

export const getGameQuestions = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.id;
    // Fetch questions separately since 'questions' is not a field in the Game model by default
    const questions = await Question.find({ game_id: gameId });

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this game' });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching game questions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('📥 Received GET /api/games/all request');
    const games = await Game.find().populate('user_id', 'email');
    console.log('First game example:', games[0] ? games[0] : 'No games found');

    console.log('🎮 Found games:', games.length);
    games.forEach((g, i) => console.log(`Game ${i + 1}:`, g.name));

    res.status(200).json({
      status: 'success',
      results: games.length,
      data: {
        games,
      },
    });
  } catch (error) {
    console.error('💥 Backend error in getAllGames:', error);
    next(error);
  }
};

export const playGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const gameId = req.params.id;
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ status: 'fail', message: 'Game not found' });
    }
    res.status(200).json({
      status: 'success',
      data: game
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

export const getGameResults = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const gameId = req.params.id;

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ status: 'fail', message: 'Game not found' });
    }

    const questions = await Question.find({ game_id: gameId });
    const answers = await Answer.find({ game_id: gameId });

    res.status(200).json({
      status: 'success',
      data: {
        game,
        questions,
        answers
      }
    });
  } catch (error) {
    next(error);
  }
};

export const submitAnswers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;

    // TODO: add logic to save/process submitted answers here

    res.status(200).json({
      status: 'success',
      message: 'Answers submitted successfully',
      // data: ...
    });
  } catch (error) {
    next(error);
  }
};
