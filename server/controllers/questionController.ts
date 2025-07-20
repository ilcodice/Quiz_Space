import { Request, Response, NextFunction } from 'express';
import Question from '../models/Question';
import ApiFeatures from '../utils/apiFeatures';
import AppError from '../utils/appError';

export const createQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text, choices, correctAnswer, game_id } = req.body;

    const question = await Question.create({
      text,
      choices,
      correctAnswer,
      game_id
    });

    res.status(201).json({
      status: 'success',
      data: question
    });
  } catch (error) {
    next(error);
  }
};

export const getAllQuestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const features = new ApiFeatures(Question.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const questions = await features.query;

    res.status(200).json({
      status: 'success',
      results: questions.length,
      data: questions
    });
  } catch (error) {
    next(error);
  }
};

export const getQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return next(new AppError('No question found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: question
    });
  } catch (error) {
    next(error);
  }
};