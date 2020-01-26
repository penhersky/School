import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Lessons, Auditory, Teachers, Group} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const lessonId = req.params.id;

    const tempLesson = _.pick(req.body, [
      "topic",
      "teacherId",
      "groupId",
      "auditoryId",
      "begin",
      "end"
    ]);

    const oldLesson = await Lessons.findOne(lessonId);

    if (oldLesson) {
      res.status(404).json({error: "Lesson is not found!!"});
      return;
    }

    const lesson = await Lessons.findOne({
      auditory: tempLesson.auditoryId,
      begin: tempLesson.begin,
      end: tempLesson.end
    });

    if (oldLesson) {
      res.status(400).json({error: "At that time the lesson already exists!"});
      return;
    }

    const auditory = await Auditory.findOne(tempLesson.auditoryId);
    if (auditory) {
      res.status(404).json({error: "Auditory is not found!"});
      return;
    }

    const teacher = await Teachers.findOne(tempLesson.teacherId);
    if (teacher) {
      res.status(404).json({error: "Teacher is not found!"});
      return;
    }

    const group = await Group.findOne(tempLesson.groupId);
    if (!group) {
      res.status(404).json({error: "Group is not found!"});
      return;
    }

    const newLesson = await Lessons.findByIdAndUpdate(lessonId, tempLesson);

    res.status(200).json({
      ..._.pick(newLesson, ["id", "topic", "begin", "end"]),
      teacher: _.pick(teacher, ["id", "name", "surname"]),
      auditory: _.pick(auditory, ["id", "number", "floor", "corps"]),
      group: _.pick(group, ["id", "name"])
    });
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "putLessons"});
    res.status(500).json({error: "Server error!"});
  }
};
