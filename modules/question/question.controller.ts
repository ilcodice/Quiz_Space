import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from './question.server.ts';

export const createQuestionController = async (
  req: express.Request,
  res: express.Response
) => createQuestion(req, res);

export const getAllQuestionsController = async (
  req: express.Request,
  res: express.Response
) => getAllQuestions(req, res);

// similarly for getQuestionByIdController, updateQuestionController, deleteQuestionController
