import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Teachers} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const teacherId = req.params.id;

    const teacher = _.pick(req.body, ["name", "surname"]);

    const oldStudent = await Teachers.findById(teacherId);
    if (!oldStudent) {
      res.status(404).json({error: "Teacher is not found!"});
      return;
    }

    const changedStudent = await Teachers.findOneAndUpdate(teacherId, teacher);
    res.status(201).json(_.pick(changedStudent, ["id", "name", "surname"]));
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "potTeacher"});
    res.status(500).json({error: "Server error!"});
  }
};
