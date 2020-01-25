import mongoose from "mongoose";

export interface AuditoryType extends mongoose.Document {
  number: {
    type: Number;
    required: true;
    unique: true;
  };
  floor: {
    type: Number;
    required: true;
  };
  corps: {
    type: String;
    required: true;
  };
}

export default mongoose.model<AuditoryType>(
  "auditory",
  new mongoose.Schema({
    number: {
      type: Number,
      required: true,
      unique: true
    },
    floor: {
      type: Number,
      required: true
    },
    corps: {
      type: String,
      required: true
    }
  })
);
