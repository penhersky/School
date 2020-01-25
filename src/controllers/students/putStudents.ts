import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Students, Group} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const student = _.pick(req.body, ["name", "surname", "groupId"]);

    const oldStudent = await Students.findById(userId);
    if (!oldStudent) {
      res.status(404).json({error: "Student is not found!"});
      return;
    }

    const group = await Group.findById(req.body.groupId);
    if (!group) {
      res.status(400).json({error: "Group is not found!"});
    }

    const changedStudent = await Students.findOneAndUpdate(userId, student);
    res
      .status(201)
      .json(_.pick(changedStudent, ["id", "name", "surname", "groupId"]));
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "potStudent"});
    res.status(500).json({error: "Server error!"});
  }
};
