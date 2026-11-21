import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cricbuzz';
  
  try {
    // Attempt connection with 3-second timeout so server doesn't hang if MongoDB is not running locally
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[Database] MongoDB Connected successfully to: ${mongoURI}`);
    return true;
  } catch (error) {
    console.warn(`[Database] Notice: Local/Remote MongoDB could not be connected (${error.message}).`);
    console.log(`[Database] Operating in zero-setup in-memory cache mode. (All features, live scores & admin console are fully active!)`);
    return false;
  }
};
