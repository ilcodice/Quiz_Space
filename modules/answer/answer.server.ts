// modules/answer/answer.server.ts
import express from 'express';
import Answer from '../../models/Answer.ts';

// Use named exports consistently
export const createAnswer = async (
  req: express.Request,
  res: express.Response
) => {
  // ... existing implementation
};

export const getAllAnswers = async (req: express.Request, res: express.Response) => {
  // ... existing implementation
};

export const getAnswerById = async (req: express.Request, res: express.Response) => {
  // ... existing implementation
};

export const updateAnswer = async (req: express.Request, res: express.Response) => {
  // ... existing implementation
};

export const deleteAnswer = async (req: express.Request, res: express.Response) => {
  // ... existing implementation
};

// Export all functions as an object if you want to import them together
export default {
  createAnswer,
  getAllAnswers,
  getAnswerById,
  updateAnswer,
  deleteAnswer
};