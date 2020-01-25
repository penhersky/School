import mongoose from "mongoose";

export interface StudentsType extends mongoose.Document {
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
  groupId: {
    type: String;
    required: true;
  };
}

export default mongoose.model<StudentsType>(
  "students",
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
    },
    groupId: {
      type: String,
      required: true
    }
  })
);
