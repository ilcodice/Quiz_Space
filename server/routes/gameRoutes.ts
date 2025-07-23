import express from 'express';
import {
  createGame,
  getGameHistory,
  submitAnswers,
  getGameResults,
  getAllGames,
  playGame
} from '../controllers/gameController.ts';

import { protect } from '../Middleware/auth.ts';
import { getGameQuestions } from '../controllers/gameController.ts';

const router = express.Router();

router.get('/all', getAllGames); 

router.use(protect); // protects all routes below

router.route('/')
    // POST /api/games/
  .get(getGameHistory);


router.get('/:id/questions', getGameQuestions);


router.get('/:id', playGame);


router.post('/create-quiz', createGame); // POST /api/games/create-quiz

router.route('/:id/answers')
  .post(submitAnswers);

router.route('/:id/results')
  .get(getGameResults);

export default router;
