import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<{
  isConnected: boolean;
  mode: "mongodb" | "fallback";
  error?: string;
}> {
  if (!MONGODB_URI) {
    return {
      isConnected: false,
      mode: "fallback",
      error: "MONGODB_URI environment variable is not defined. Running in fallback mode.",
    };
  }

  if (cached.conn) {
    return { isConnected: true, mode: "mongodb" };
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 4000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    return { isConnected: true, mode: "mongodb" };
  } catch (e: unknown) {
    cached.promise = null;
    const msg = e instanceof Error ? e.message : "Failed to connect to MongoDB";
    return {
      isConnected: false,
      mode: "fallback",
      error: msg,
    };
  }
}

export function isMongoDbAvailable(): boolean {
  return mongoose.connection.readyState === 1;
}
