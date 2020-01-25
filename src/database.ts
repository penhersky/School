import mongoose from "mongoose";
import {isDevelopment} from "./config";
import log from "./helpers";

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
    log.error(error.message, {path: __filename, object: "connectDB"});
  }
};
