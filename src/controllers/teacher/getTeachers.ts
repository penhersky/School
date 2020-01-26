import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Teachers} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const teachers = await Teachers.find();
    res.status(200).json({
      Teachers: teachers.map(teacher =>
        _.pick(teacher, ["id", "name", "surname"])
      )
    });
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "getTeachers"});
    res.status(500).json({error: "Server error!"});
  }
};
