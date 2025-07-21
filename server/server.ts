import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './routes/authRoutes.ts';
import express from 'express';
import { connectToDatabase } from './config/db.ts';
import cors from 'cors';
import routes from './app.ts';
import userRouter from './routes/userRoutes.ts';
import cookieParser from 'cookie-parser';
import gameRoutes from './routes/gameRoutes.ts'; 
// Create express app
const app = express();


app.use(cookieParser());


// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Cookie settings for production
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};


app.use('/api', routes);
app.use('/api/auth', authRoutes);
app.use('/api', userRouter); 
app.use('/api/games', gameRoutes);
// After all routes
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found'
  });
});


// Database connection and server start
const PORT = process.env.PORT || 5001;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  });


  