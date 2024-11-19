const mongoose = require("mongoose");
const envUtil = require("../util/envUtil");

const connectDB = async () => {
  try {
    console.log("Connecting to mongodb ..... ");
    await mongoose.connect(envUtil.getMongoDbUri()).then(() => {
      console.log("MongoDB connected successfully");
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
