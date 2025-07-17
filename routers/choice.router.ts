
import { Router } from 'express';
import {
  createChoiceController,
  getAllChoicesController,
  getChoiceByIdController,
  updateChoiceController,
  deleteChoiceController,
} from '../modules/choice/choice.controller.ts';

const router = Router();

router.post('/create-choice', createChoiceController);
router.get('/', getAllChoicesController);
router.get('/:id', getChoiceByIdController);
router.put('/:id', updateChoiceController);
router.delete('/:id', deleteChoiceController);

export default router;
