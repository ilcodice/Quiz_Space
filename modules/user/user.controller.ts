// import { Request, Response } from 'express';
// import User from '../../models/User';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// const JWT_SECRET = process.env.JWT_SECRET as string;

// export const signup = async (req: Request, res: Response) => {
//   try {
//     const { email, password, user_name } = req.body;

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Email already in use' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = new User({
//       user_name,
//       email,
//       password: hashedPassword
//     });

//     await user.save();

//     // Generate token
//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

//     // Set cookie
//     res.cookie('token', token, {
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//       sameSite: 'strict',
//       secure: process.env.NODE_ENV === 'production'
//     });

//     res.status(201).json({ 
//       user: {
//         _id: user._id,
//         user_name: user.user_name,
//         email: user.email,
//         profile_image: user.profile_image
//       }
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Generate token
//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

//     // Set cookie
//     res.cookie('token', token, {
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//       sameSite: 'strict',
//       secure: process.env.NODE_ENV === 'production'
//     });

//     res.json({ 
//       user: {
//         _id: user._id,
//         user_name: user.user_name,
//         email: user.email,
//         profile_image: user.profile_image
//       }
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const logout = (req: Request, res: Response) => {
//   res.clearCookie('token');
//   res.json({ message: 'Logged out successfully' });
// };

// export const checkAuth = (req: Request, res: Response) => {
//   res.json({ user: req.user });
// };