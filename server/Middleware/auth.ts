// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import User from '../models/User';
// import AppError from '../utils/appError';

// export const protect = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     let token;
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//       token = req.headers.authorization.split(' ')[1];
//     } else if (req.cookies.jwt) {
//       token = req.cookies.jwt;
//     }

//     if (!token) {
//       return next(new AppError('You are not logged in! Please log in to get access.', 401));
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return next(new AppError('The user belonging to this token no longer exists.', 401));
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };



// // server/middleware/auth.ts
// export const protect = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // 1. Get token from header
//     const token = req.headers.authorization?.split(' ')[1];
    
//     if (!token) {
//       return res.status(401).json({ message: 'Not authorized, no token' });
//     }

//     // 2. Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    
//     // 3. Get user
//     const user = await User.findById(decoded.userId).select('-password');
    
//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error('Auth error:', error);
//     res.status(401).json({ message: 'Not authorized, token failed' });
//   }
// };


// server/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

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
