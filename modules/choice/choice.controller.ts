import express from 'express';
import {
  createChoice,
  getAllChoices,
  getChoiceById,
  updateChoice,
  deleteChoice,
} from './choice.server.ts';


export const createChoiceController = async (
  req: express.Request,
  res: express.Response
) => createChoice(req, res);

export const getAllChoicesController = async (
  req: express.Request,
  res: express.Response
) => getAllChoices(req, res);

export const getChoiceByIdController = async (
  req: express.Request,
  res: express.Response
) => getChoiceById(req, res);

export const updateChoiceController = async (
  req: express.Request,
  res: express.Response
) => updateChoice(req, res);

export const deleteChoiceController = async (
  req: express.Request,
  res: express.Response
) => deleteChoice(req, res);
