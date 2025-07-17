// models/Game/game.router.ts

// import express from "express";
// import {
//   createGameController,
//   getAllGamesController,
//   getGameByIdController,
//   updateGameController,
//   deleteGameController,
// } from "../modules/game/game.controller.ts";

// const router = express.Router();

// // /api/games
// router.post("/create-game", createGameController);
// router.get("/all-games", getAllGamesController);
// router.get("/:id", getGameByIdController);
// router.put("/:id", updateGameController);
// router.delete("/:id", deleteGameController);

// export default router;



import express from "express";
import { body, validationResult } from 'express-validator';
import {
  createGameController,
  getAllGamesController,
  getGameByIdController,
  updateGameController,
  deleteGameController,


  createQuizGameController
} from "../modules/game/game.controller.ts";

const router = express.Router();


router.post("/", createGameController);


router.post("/create-quiz",
  [
    body('gameDetails.name').notEmpty(),
    body('questions').isArray({ min: 1 }),
    body('questions.*.text').notEmpty(),
    body('questions.*.correctAnswer').isIn(['a', 'b', 'c', 'd'])
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createQuizGameController  
);

router.get("/", getAllGamesController);
router.get("/:id", getGameByIdController);
router.put("/:id", updateGameController);
router.delete("/:id", deleteGameController);

export default router;
