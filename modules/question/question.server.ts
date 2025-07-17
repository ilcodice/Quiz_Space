import express from 'express';
import Question from '../../models/Question.ts';

// Create Question
export const createQuestion = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { 
      text,
      choices,
      correctAnswer,
      game_id 
    } = req.body;

    // Validate required fields
    if (!text || !choices || !correctAnswer || !game_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate choices structure
    if (!choices.a || !choices.b || !choices.c || !choices.d) {
      return res.status(400).json({ error: 'All choices (a, b, c, d) are required' });
    }

    // Validate correct answer
    if (!['a', 'b', 'c', 'd'].includes(correctAnswer)) {
      return res.status(400).json({ error: 'Correct answer must be a, b, c, or d' });
    }

    const newQuestion = new Question({
      text,
      choices,
      correctAnswer,
      game_id
    });

    const savedQuestion = await newQuestion.save();
    return res.status(201).json(savedQuestion);
  } catch (err) {
    console.error('Question creation error:', err);
    return res.status(500).json({ 
      error: 'Server error', 
      details: err instanceof Error ? err.message : String(err) 
    });
  }
};

// Get All Questions
export const getAllQuestions = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const questions = await Question.find().populate('game_id');
    return res.json(questions);
  } catch (err) {
    console.error('Get questions error:', err);
    return res.status(500).json({ 
      error: 'Server error', 
      details: err instanceof Error ? err.message : String(err) 
    });
  }
};

// Get Questions by Game ID
export const getQuestionsByGameId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { gameId } = req.params;
    const questions = await Question.find({ game_id: gameId });
    return res.json(questions);
  } catch (err) {
    console.error('Get questions by game error:', err);
    return res.status(500).json({ 
      error: 'Server error', 
      details: err instanceof Error ? err.message : String(err) 
    });
  }
};

// Get Question by ID
export const getQuestionById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id).populate('game_id');
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    return res.json(question);
  } catch (err) {
    console.error('Get question error:', err);
    return res.status(500).json({ 
      error: 'Server error', 
      details: err instanceof Error ? err.message : String(err) 
    });
  }
};

// Update Question
export const updateQuestion = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { text, choices, correctAnswer } = req.body;

    // Validate correct answer if provided
    if (correctAnswer && !['a', 'b', 'c', 'd'].includes(correctAnswer)) {
      return res.status(400).json({ error: 'Correct answer must be a, b, c, or d' });
    }

    const updated = await Question.findByIdAndUpdate(
      id,
      { text, choices, correctAnswer },
      { new: true, runValidators: true }
    );
    
    if (!updated) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    return res.json(updated);
  } catch (err) {
    console.error('Update question error:', err);
    return res.status(500).json({ 
      error: 'Server error', 
      details: err instanceof Error ? err.message : String(err) 
    });
  }
};

// Delete Question
export const deleteQuestion = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deleted = await Question.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    // Optionally: Remove question reference from the game
    // await Game.updateOne(
    //   { questions: id },
    //   { $pull: { questions: id } }
    // );
    
    return res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    console.error('Delete question error:', err);
    return res.status(500).json({ 
      error: 'Server error', 
      details: err instanceof Error ? err.message : String(err) 
    });
  }
};