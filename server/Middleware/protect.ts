import jwt from 'jsonwebtoken';
import User from '../models/User.ts';
import AppError from '../utils/appError.ts';
import type { Request, Response, NextFunction } from 'express';

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return next(new AppError('Not logged in', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('User no longer exists', 401));
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    next(new AppError('Invalid token', 401));
  }
};
