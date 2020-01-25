import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Students, Group} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const student = await Students.findById(userId);
    if (!student) {
      res.status(404).json({error: "Student is not found!"});
      return;
    }

    const group = await Group.findById(student.groupId);

    res.status(200).json({
      ..._.pick(student, ["id", "name", "surname"]),
      group: _.pick(group, ["id", "name"])
    });
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "getStudent"});
    res.status(500).json({error: "Server error!"});
  }
};
