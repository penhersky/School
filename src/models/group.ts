import mongoose from "mongoose";

export interface GroupType extends mongoose.Document {
  name: {
    type: String;
    required: true;
    unique: true;
  };
}

export default mongoose.model<GroupType>(
  "group",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    }
  })
);
