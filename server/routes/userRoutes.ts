// server/routes/userRoutes.ts
import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.ts';
import { protect } from '../Middleware/protect.ts';

const router = express.Router();

router.use(protect); // Protect all routes below

// Add these routes

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);


// Keep your existing /:id routes if needed
router.route('/:id')
  .get(getProfile)
  .patch(updateProfile);

export default router;