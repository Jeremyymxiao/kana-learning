import mongoose from 'mongoose';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kana-learning';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose as MongooseCache;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  try {
    if (cached.conn) {
      console.log('Using cached MongoDB connection');
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: true,
      };

      console.log('Creating new MongoDB connection...');
      cached.promise = mongoose.connect(MONGODB_URI, opts);
    }

    try {
      cached.conn = await cached.promise;
      console.log('MongoDB connected successfully');
    } catch (e) {
      console.error('MongoDB connection error:', e);
      cached.promise = null;
      throw e;
    }

    return cached.conn;
  } catch (error) {
    console.error('Error in connectDB:', error);
    throw error;
  }
}

export default connectDB; 