// models/Choice/choice.server.ts

import express from 'express';
import Choice from '../../models/Choice.ts';

// Create
export const createChoice = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { question_id, choiced_text, is_correct } = req.body;

    const newChoice = new Choice({
      question_id,
      choiced_text,
      is_correct,
    });

    const saved = await newChoice.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err });
  }
};

// Get all
export const getAllChoices = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const choices = await Choice.find();
    return res.json(choices);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err });
  }
};

// Get by ID
export const getChoiceById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const choice = await Choice.findById(id);
    if (!choice) {
      return res.status(404).json({ message: 'Choice not found' });
    }
    return res.json(choice);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err });
  }
};

// Update
export const updateChoice = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const updated = await Choice.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: 'Choice not found' });
    }
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err });
  }
};

// Delete
export const deleteChoice = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deleted = await Choice.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Choice not found' });
    }
    return res.json({ message: 'Choice deleted' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err });
  }
};
