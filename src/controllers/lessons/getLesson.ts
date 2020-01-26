import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Group, Teachers, Auditory, Lessons, Students} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const lessonsId = req.params.id;

    const lesson = await Lessons.findById(lessonsId);
    if (!lesson) {
      res.status(400).json({error: "Lesson is not found!"});
      return;
    }
    const teacher = await Teachers.findById(lesson.teacherId);
    const group = await Group.findById(lesson.groupId);
    const auditory = await Auditory.findById(lesson.auditoryId);

    const students = await Students.find({groupId: group?.id});

    res.status(200).json({
      ..._.pick(lesson, ["id", "topic", "begin", "end"]),
      teacher: _.pick(teacher, ["id", "name", "surname"]),
      auditory: _.pick(auditory, ["id", "number", "floor", "corps"]),
      group: {
        ..._.pick(group, ["id", "name"]),
        students: students.map(student =>
          _.pick(student, ["id", "name", "surname"])
        )
      }
    });
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "getLesson"});
    res.status(500).json({error: "Server error!"});
  }
};
