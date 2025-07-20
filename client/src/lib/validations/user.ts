import { z } from 'zod';

export const registerSchema = z.object({
  user_name: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const updateUserSchema = z.object({
  user_name: z.string().min(3).max(30).optional(),
  email: z.string().email().optional(),
  profile_image: z.string().url().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;