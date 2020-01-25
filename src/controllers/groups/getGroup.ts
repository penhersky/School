import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Group, Students} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const groupId = req.params.id;

    const group = await Group.findById(groupId);
    if (!group) {
      res.status(400).json({error: "Group is not found!"});
      return;
    }
    const students = await Students.find({groupId});
    res.status(200).json({
      ..._.pick(group, ["id", "name"]),
      students: students.map(student =>
        _.pick(student, ["id", "name", "surname"])
      )
    });
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "getGroup"});
    res.status(500).json({error: "Server error!"});
  }
};
