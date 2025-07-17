// models/Game/game.server.ts

import express from 'express';
import Game from '../../models/Game.ts';



// Create Game
export const createGame = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { 
      mode, 
      user_id, 
      start_time, 
      end_time, 
      max_players,
      name,
      difficulty,
      startDate,
      createdBy
    } = req.body;

    const newGame = new Game({
      mode,
      user_id,
      start_time: new Date(start_time),
      end_time: end_time ? new Date(end_time) : null,
      max_players,
      name,
      difficulty,
      startDate,
      createdBy
    });

    const saved = await newGame.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err });
  }
};

// ... (keep other functions the same, they'll automatically return all fields)





// Get all Games
export const getAllGames = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const games = await Game.find();
    return res.json(games);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err });
  }
};

// Get Game by ID
export const getGameById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    return res.json(game);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err });
  }
};

// Update Game
export const updateGame = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const updated = await Game.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Game not found' });
    }
    
    return res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update game error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to update game',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const createQuizGame = async (
  req: express.Request,
  res: express.Response
) => {
  console.log('Create game request received:', req.body); // Log incoming request
  console.log('Authenticated user:', (req as any).user); // Log user info

  try {
    const { gameDetails, questions } = req.body;
    const userId = (req as any).user.userId;

    console.log('Creating game for user:', userId);
    console.log('Game details:', gameDetails);
    console.log('Number of questions:', questions.length);

    // ... rest of your controller code ...
  } catch (err) {
    console.error('Detailed error:', {
      message: err.message,
      stack: err.stack,
      requestBody: req.body
    });
    return res.status(500).json({ 
      success: false,
      message: 'Failed to create game',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// Delete Game Function
export const deleteGame = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deleted = await Game.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Game not found' });
    }
    
    return res.json({ 
      success: true,
      message: 'Game deleted successfully',
      deletedId: id
    });
  } catch (error) {
    console.error('Delete game error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to delete game',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Make sure all exports are listed
export default {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame
};

