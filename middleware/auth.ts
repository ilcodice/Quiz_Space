// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.ts';

// const JWT_SECRET = process.env.JWT_SECRET as string;

// export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // Get token from cookie or header
//     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
//     if (!token) {
//       return res.status(401).json({ error: 'Authentication required' });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
//     // Find user
//     const user = await User.findById(decoded.userId).select('-password');
//     if (!user) {
//       return res.status(401).json({ error: 'User not found' });
//     }

//     // Attach user to request
//     req.user = user;
//     next();

//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };



import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.ts';

const JWT_SECRET = process.env.JWT_SECRET as string;


type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;


interface AuthenticatedRequest extends Request {
  user?: any; 
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
 
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Find user
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
