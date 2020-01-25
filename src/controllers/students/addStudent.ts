import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Students, Group} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const group = await Group.findById(req.body.groupId);
    if (!group) {
      res.status(400).json({error: "Group is not found!"});
    }

    const newStudent = await Students.create({
      name: req.body.name,
      surname: req.body.surname,
      groupId: req.body.groupId
    });

    res
      .status(201)
      .json(_.pick(newStudent, ["id", "name", "surname", "groupId"]));
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "addStudent"});
    res.status(500).json({error: "Server error!"});
  }
};
