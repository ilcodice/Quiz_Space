

import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import UserModel from "../models/User.ts";
import { auth } from "../auth-middleware.ts";

const router = express.Router();

// Middleware
router.use((req, res, next) => {
  console.log(`Auth route accessed: ${req.method} ${req.path}`);
  next();
});

// Zod Schemas
const signupSchema = z.object({
  user_name: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: z.string()
    .email("Invalid email address")
    .max(50, "Email must be at most 50 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});


// POST /signup
router.post("/signup", async (req, res) => {
  console.log('Signup request received:', req.body); // Add this line
  
  try {
    const result = signupSchema.safeParse(req.body);
    console.log('Validation result:', result); // Add this
    
    if (!result.success) {
      console.log('Validation failed:', result.error);

      return res.status(400).json({
        success: false,
        errors: result.error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message
        }))
      });
    }

    const { user_name, email, password } = result.data;

    const existingUser = await UserModel.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') }
    });
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      user_name,
      email: email.toLowerCase(), // Store email in lowercase
      password: hashedPassword,
    });

    // Generate token immediately after signup
    // In your auth.router.ts login route
    const token = jwt.sign(
      { userId: user._id }, // Make sure this is the exact structure
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token, // Send token back to client
      user: {
        id: user._id,
        email: user.email,
        user_name: user.user_name
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

// POST /login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Case-insensitive email search
    const user = await UserModel.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Wrong credentials, try again", // Consistent message
        error: "invalid_credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Wrong credentials, try again", // Same message for security
        error: "invalid_credentials"
      });
    }


    // Generate token
 // In your auth.router.ts login route
const token = jwt.sign(
  {
      userId: user._id.toString(), // Consistent property name
      email: user.email,           // Additional claims if needed
      iat: Date.now()              // Issued at timestamp
  },
  process.env.JWT_SECRET!,
  { expiresIn: '1h' }
);

console.log('Generated Token Payload:', {
  userId: user._id.toString(),
  token: token
});

res.json({
  success: true,
  token,
  user: {
    id: user._id,
    email: user.email,
    user_name: user.user_name
  }
});


// GET /auth/check 
router.get("/check", auth, async (req, res) => {
  try {
      // If we get here, the token was valid (auth middleware passed)
      const user = await UserModel.findById((req as any).user.userId).select('-password');
      
      if (!user) {
          return res.status(404).json({ 
              success: false,
              message: "User not found" 
          });
      }

      res.json({
          success: true,
          user: {
              id: user._id,
              email: user.email,
              name: user.user_name
          }
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Error checking auth status",
          error: "server_error"
      });
  }
});

export default router;