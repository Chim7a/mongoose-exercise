import dotenv from "dotenv/config";
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
  } catch (error) {
    console.log(error);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
