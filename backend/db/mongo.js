const mongoose = require("mongoose");

const connectMongo = async () => {
  if (!process.env.MONGO_URI) {
    console.log("⚪ MongoDB not configured (running SQL-only mode)");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🟢 MongoDB connected");
  } catch (err) {
    console.error("🔴 MongoDB connection failed:", err.message);
  }
};

module.exports = connectMongo;