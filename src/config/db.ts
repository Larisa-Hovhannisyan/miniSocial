import mongoose from "mongoose";

const uri = process.env.MONGO_URI || "";

export default async function connectDB() {
  if (!uri) throw new Error("MONGO_URI not set in environment");
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
