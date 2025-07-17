
import express from 'express';

import {
  createAnswer,
  getAllAnswers,
  getAnswerById,
  updateAnswer,
  deleteAnswer,
} from './answer.server.ts';

// ✅ Use express.Request and express.Response to avoid named export issues

export const createAnswerController = async (
  req: express.Request,
  res: express.Response
) => createAnswer(req, res);

export const getAllAnswersController = async (
  req: express.Request,
  res: express.Response
) => getAllAnswers(req, res);

export const getAnswerByIdController = async (
  req: express.Request,
  res: express.Response
) => getAnswerById(req, res);

export const updateAnswerController = async (
  req: express.Request,
  res: express.Response
) => updateAnswer(req, res);

export const deleteAnswerController = async (
  req: express.Request,
  res: express.Response
) => deleteAnswer(req, res);
