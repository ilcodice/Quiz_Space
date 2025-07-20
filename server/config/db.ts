
import mongoose from "mongoose";

// Directly check the env variable first
const MONGODB_URI = process.env.MONGODB_URI;


console.log('DB Config - MONGODB_URI:', MONGODB_URI);  // Debug log

if (!MONGODB_URI) {
  throw new Error(`
    Please define the MONGODB_URI environment variable inside .env
    Current working directory: ${process.cwd()}
    Environment keys: ${Object.keys(process.env).join(', ')}
  `);
}


let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  console.log("Connected to database");
  return cached.conn;
}
