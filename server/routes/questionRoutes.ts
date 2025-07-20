import express from 'express';
import { protect, restrictTo } from '../middleware/auth.ts';
import {
  createQuestion,
  getAllQuestions,
  getQuestion
} from '../controllers/questionController.ts';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(restrictTo('admin'), createQuestion)
  .get(getAllQuestions);

router.route('/:id')
  .get(getQuestion);

export default router;