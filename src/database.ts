import mongoose from "mongoose";
import {isDevelopment} from "./config";

export default async (url: string) => {
  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log("Connect to mongodb!");
  } catch (error) {
    if (isDevelopment) console.log(error);
  }
};
