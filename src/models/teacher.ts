import mongoose from "mongoose";

export interface TeacherType extends mongoose.Document {
  name: {
    type: String;
    required: true;
    unique: true;
  };
  surname: {
    type: String;
    required: true;
    unique: true;
  };
}

export default mongoose.model<TeacherType>(
  "teacher",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    surname: {
      type: String,
      required: true,
      unique: true
    }
  })
);
