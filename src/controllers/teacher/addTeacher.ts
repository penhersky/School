import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Teachers} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const teacher = await Teachers.findOne({
      name: req.body.name,
      surname: req.body.surname
    });
    if (teacher) {
      res.status(400).json({error: "The teacher already exists!"});
      return;
    }

    const newTeacher = await Teachers.create({
      name: req.body.name,
      surname: req.body.surname
    });

    res.status(201).json(_.omit(newTeacher, ["id", "name", "surname"]));
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "addTeacher"});
    res.status(500).json({error: "Server error!"});
  }
};
