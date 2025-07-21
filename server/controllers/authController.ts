import { signToken } from '../utils/jwt.ts';
import express from 'express';
import User from '../models/User.ts'; 
import AppError from '../utils/appError.ts';
import bcrypt from 'bcryptjs';

const { Request, Response, NextFunction } = express;

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('Email already in use', 400));
    }
    console.log('New user registered:', user_name, email);
    // Temporarily add to signup controller
    console.log('Raw password:', password);
    console.log('Hashed password:', await bcrypt.hash(password, 12));


    const newUser = await User.create({
      user_name,
      email,
      password
    });

    // Create token and set cookie
    const token = signToken(newUser._id);
    setJwtCookie(res, token);

    // Remove password from output
    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      message: 'Registration successful', // Add explicit message
      token, // Still return token for mobile clients
      data: {
        user: sanitizeUser(newUser)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // 1) Find user with password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AppError('No user found with this email', 401));
    }

    // 2) Debug password comparison
    console.log('Input Password:', password);
    console.log('Stored Hash:', user.password);
    const isMatch = await user.comparePassword(password);
    console.log('Comparison Result:', isMatch);

    if (!isMatch) {
      return next(new AppError('Incorrect password', 401));
    }

    // 3) Generate token
    const token = signToken(user._id);
    setJwtCookie(res, token);

    res.status(200).json({
      status: 'success',
      token,
      data: { user: sanitizeUser(user) }
    });

    

  } catch (error) {
    console.error('Login Error:', error);
    next(new AppError('Something went wrong!!', 500));
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.status(200).json({ status: 'success' });
};

// Helper Functions
const setJwtCookie = (res: Response, token: string) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN as any) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const
  };

  res.cookie('jwt', token, cookieOptions);
};

const sanitizeUser = (user: any) => {
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.__v;
  delete userObj.updatedAt;
  return userObj;
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user.id); // req.user is set by your auth middleware
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { user: sanitizeUser(user) }
    });
  } catch (error) {
    next(error);
  }
};
