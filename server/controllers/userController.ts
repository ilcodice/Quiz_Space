// import { Request, Response, NextFunction } from 'express';
// import User from '../models/User';

// export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await User.findById(req.user._id);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         user
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // controllers/userController.ts
// export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { user_name, email, profile_image, bio, location } = req.body;

//     const updatedUser = await User.findByIdAndUpdate(
//       req.user._id,
//       { user_name, email, profile_image, bio, location },
//       { new: true, runValidators: true }
//     ).select('-password'); // Exclude password from response

//     res.status(200).json({
//       status: 'success',
//       data: {
//         user: updatedUser
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     await User.findByIdAndUpdate(req.user._id, { active: false });

//     res.status(204).json({
//       status: 'success',
//       data: null
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // controllers/userController.ts
// export const getUserStats = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // Implement your stats aggregation here
//     res.status(200).json({
//       status: 'success',
//       data: {
//         gamesPlayed: 0,
//         gamesWon: 0,
//         totalScore: 0,
//         averageScore: 0,
//         winRate: 0
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// server/controllers/userController.ts
import type { Request, Response } from 'express';
import User from '../models/User.ts';

export const getProfile = async (req: Request, res: Response) => {
  try {
    // Get user from protected route (either current user or by ID)
    const user = await User.findById(req.params.id || req.user.id)
      .select('-password -__v');
    
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          user_name: user.user_name,
          email: user.email,
          profile_image: user.profile_image,
          bio: user.bio,
          location: user.location,
          // createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const updates = {
      user_name: req.body.user_name,
      email: req.body.email,
      profile_image: req.body.profile_image,
      bio: req.body.bio,
      location: req.body.location
    };

    const user = await User.findByIdAndUpdate(
      req.params.id || req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password -__v');

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};