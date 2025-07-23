
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.ts';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ✅ Get token from cookie (not from header)
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    // ✅ Find user
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
