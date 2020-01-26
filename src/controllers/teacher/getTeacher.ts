import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Teachers} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const teachersId = req.params.id;

    const teacher = await Teachers.find({teachersId});
    if (teacher) {
      res.status(400).json({error: "Teacher is not found!"});
      return;
    }
    res.status(200).json(_.pick(teacher, ["id", "name", "surname"]));
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "getTeachers"});
    res.status(500).json({error: "Server error!"});
  }
};
