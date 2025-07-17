// modules/question/question.routes.ts
import { Router } from 'express';
import {
  createQuestionController,
  getAllQuestionsController,
  // getQuestionsByGameIdController,  // Falls du diese Funktion hast
  // getQuestionByIdController,
  // updateQuestionController,
  // deleteQuestionController
} from '../modules/question/question.controller.ts';

const router = Router();

router.post('/', createQuestionController);
router.get('/', getAllQuestionsController);
// router.get('/game/:gameId', getQuestionsByGameIdController); // falls vorhanden
// router.get('/:id', getQuestionByIdController);
// router.put('/:id', updateQuestionController);
// router.delete('/:id', deleteQuestionController);

export default router;
