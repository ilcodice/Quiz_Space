// import express from "express";
// import authRouter from "./routers/auth.router.ts";
// import gameRouter from "./routers/games.router.ts";
// import answerRouter from "./routers/answer.router.ts";
// import choiceRouter from "./routers/choice.router.ts";
// import questionRouter from "./routers/question.router.ts";
// import helmet from "helmet";

// const app = express();

// //adding helmet  Application level middleware that adds security headers
// app.use(helmet());

// //Application level middleware
// // this will be run before any endpoint in the app

// function appMiddleware(req: any, res: any, next: any) {
//     console.log("Application level middleware");
//     next();
// }

// app.use(appMiddleware);



// app.use(express.json());


// app.use("/auth", authRouter);
// app.use("/games", gameRouter);
// app.use("/answers", answerRouter);
// app.use("/choices", choiceRouter);
// app.use("/questions", questionRouter);


// // Error handling middleware (application level middleware)
// app.use((err:any, req:any, res:any, next:any)=>{
//     if(err)
//         return res.status(500).send("server error");
//     next();
// })



// app.listen(5001, () => {
//     console.log("Server running on port 5001");
// });





import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config({ path: '.env.local' });
console.log('MONGODB_URI:', process.env.MONGODB_URI);
// Remove .ts extensions from imports
import gameRoutes from './routers/games.router.ts';
import questionRoutes from './routers/question.router.ts';
import answerRoutes from './routers/answer.router.ts';
import authRouter from './routers/auth.router.ts'; 


config();


const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/games', gameRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);



// check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;