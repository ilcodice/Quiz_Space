import express from 'express';
import { signup } from '../controllers/authController.ts';      // Best option
import { login } from '../controllers/authController.ts';      // Best option
import { logout } from '../controllers/authController.ts';      // Best option


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.route('/logout')
  .get(logout)
  .post(logout);
// router.post('/forgot-password', forgotPassword);
// router.patch('/reset-password/:token', resetPassword);

export default router;