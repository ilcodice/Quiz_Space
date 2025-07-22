// server/routes/userRoutes.ts
import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.ts';
import { protect } from '../Middleware/protect.ts';
import { verifyToken } from '../Middleware/verifyToken.ts';
const router = express.Router();


router.get('/check', verifyToken, (req, res) => {
  return res.status(200).json({
    user: {
      user_name: req.user.user_name,
      email: req.user.email,
    },
  });
});


router.use(protect); // Protect all routes below

// Add these routes

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);


// Keep your existing /:id routes if needed
router.route('/:id')
  .get(getProfile)
  .patch(updateProfile);

export default router;