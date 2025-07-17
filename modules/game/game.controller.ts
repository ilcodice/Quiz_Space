// // game.server.ts

// export const createGame = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     // ✅ Remove authentication check entirely
//     // console.log('Request user:', (req as any).user); // Optional: remove this too

//     // If you still want to optionally log who created it (if available)
//     const userId = (req as any).user?.userId || 
//                    (req as any).user?.id || 
//                    (req as any).user?.tokenData?.userId || null;

//     // 🗑️ REMOVE THIS BLOCK: 
//     // if (!userId) {
//     //   return res.status(401).json({
//     //     success: false,
//     //     message: "Authentication failed",
//     //   });
//     // }

//     // ✅ Continue with the rest of your logic to create the game
//     // Example:
//     const { title, questions } = req.body;

//     if (!title || !questions) {
//       return res.status(400).json({
//         success: false,
//         message: "Title and questions are required",
//       });
//     }

//     const newGame = await Game.create({
//       title,
//       questions,
//       createdBy: userId, // can be null
//     });

//     return res.status(201).json({
//       success: true,
//       data: newGame,
//     });
//   } catch (err) {
//     console.error('Game creation error:', err);
//     return res.status(500).json({ 
//       success: false,
//       message: 'Failed to create game',
//       error: process.env.NODE_ENV === 'development' ? err.message : undefined
//     });
//   }
// };






// import { Request, Response } from 'express';
// import Game from '../../models/Game.ts';
// import Question from '../../models/Question.ts';

// interface IQuestion {
//   question: string;
//   a: string;
//   b: string;
//   c: string;
//   d: string;
//   correctAnswer: string;
// }

// interface IGameDetails {
//   name: string;
//   difficulty: string;
//   startDate: string;
//   startTime: string;
// }

// export const createQuizGame = async (req: Request, res: Response) => {
//   try {
//     const { gameDetails, questions } = req.body as {
//       gameDetails: IGameDetails,
//       questions: IQuestion[]
//     };

//     if (!req.user) {
//       return res.status(401).json({ error: 'Authentication required' });
//     }

//     // Validate we have exactly 10 questions
//     if (questions.length !== 10) {
//       return res.status(400).json({ error: 'Exactly 10 questions are required' });
//     }

//     // Create game
//     const game = new Game({
//       name: gameDetails.name,
//       difficulty: gameDetails.difficulty,
//       user_id: req.user._id,
//       startDate: gameDetails.startDate,
//       start_time: new Date(`${gameDetails.startDate}T${gameDetails.startTime}`),
//       createdBy: req.user.user_name,
//       questions: [],
//       answers: []
//     });

//     // Create questions
//     const questionPromises = questions.map(async (q) => {
//       const question = new Question({
//         text: q.question,
//         choices: {
//           a: q.a,
//           b: q.b,
//           c: q.c,
//           d: q.d
//         },
//         correctAnswer: q.correctAnswer,
//         game_id: game._id
//       });
//       await question.save();
//       return question._id;
//     });

//     const questionIds = await Promise.all(questionPromises);
//     game.questions = questionIds;
//     await game.save();

//     res.status(201).json({ game });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getAllGames = async (req: Request, res: Response) => {
//   try {
//     const games = await Game.find()
//       .populate('user_id', 'user_name profile_image')
//       .sort({ createdAt: -1 });
      
//     res.json(games);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getGameById = async (req: Request, res: Response) => {
//   try {
//     const game = await Game.findById(req.params.id)
//       .populate('user_id', 'user_name profile_image')
//       .populate({
//         path: 'questions',
//         select: 'text choices correctAnswer'
//       });

//     if (!game) {
//       return res.status(404).json({ error: 'Game not found' });
//     }

//     res.json(game);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

import express from 'express';
import {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
} from './game.server.ts';

export const createGameController = async (req: express.Request, res: express.Response) => {
  return createGame(req, res);
};

export const getAllGamesController = async (req: express.Request, res: express.Response) => {
  return getAllGames(req, res);
};

export const getGameByIdController = async (req: express.Request, res: express.Response) => {
  return getGameById(req, res);
};

export const updateGameController = async (req: express.Request, res: express.Response) => {
  return updateGame(req, res);
};

export const deleteGameController = async (req: express.Request, res: express.Response) => {
  return deleteGame(req, res);
};
export const createQuizGameController = async (req: express.Request, res: express.Response) => {
  return createQuizGame(req, res);
};

