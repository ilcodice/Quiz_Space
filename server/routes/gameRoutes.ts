import express from 'express';
import { protect } from '../middleware/auth.ts';
import {
  createGame,
  getGameHistory,
  submitAnswers,
  getGameResults
} from '../controllers/gameController.ts';

const router = express.Router();



router.use(protect);

router.route('/')
  .post(createGame)
  .get(getGameHistory);

router.post('/create-quiz', protect, createGame);

router.route('/:id/answers')
  .post(submitAnswers);

router.route('/:id/results')
  .get(getGameResults);

export default router;