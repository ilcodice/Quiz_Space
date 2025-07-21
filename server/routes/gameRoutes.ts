import express from 'express';
import {
  createGame,
  getGameHistory,
  submitAnswers,
  getGameResults,
  getAllGames
} from '../controllers/gameController.ts';

import { protect } from '../middleware/auth.ts';

const router = express.Router();

router.get('/all', getAllGames); // ✅ Add this above .use(protect) if public access is okay


router.use(protect); // protects all routes below

router.route('/')
    // POST /api/games/
  .get(getGameHistory);


router.post('/create-quiz', createGame); // POST /api/games/create-quiz

router.route('/:id/answers')
  .post(submitAnswers);

router.route('/:id/results')
  .get(getGameResults);

export default router;
