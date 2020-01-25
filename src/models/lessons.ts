import mongoose from "mongoose";

export interface LessonsType extends mongoose.Document {
  topic: {
    type: String;
    required: true;
  };
  teacherId: {
    type: String;
    required: true;
  };
  groupId: {
    type: String;
    required: true;
  };
  auditoryId: {
    type: String;
    required: true;
  };
  begin: {
    type: Date;
    required: true;
  };
  end: {
    type: Date;
    required: true;
  };
}

export default mongoose.model<LessonsType>(
  "lessons",
  new mongoose.Schema({
    topic: {
      type: String,
      required: true
    },
    teacherId: {
      type: String,
      required: true
    },
    groupId: {
      type: String,
      required: true
    },
    auditoryId: {
      type: String,
      required: true
    },
    begin: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  })
);
