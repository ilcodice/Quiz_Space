

import express from "express";
import {
  createAnswerController,
  getAllAnswersController,
  getAnswerByIdController,
  updateAnswerController,
  deleteAnswerController,
} from "../modules/answer/answer.controller.ts";

const router = express.Router();

// POST
router.post("/create-answer", createAnswerController);

// GET all
router.get("/all-answers", getAllAnswersController);

// GET by ID
router.get("/:id", getAnswerByIdController);

// PUT
router.put("/:id", updateAnswerController);

// DELETE
router.delete("/:id", deleteAnswerController);

export default router;
