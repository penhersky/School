import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Students} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const students = await Students.find();
    res
      .status(200)
      .json(
        students.map(student => _.pick(student, ["id", "name", "surname"]))
      );
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "getStudent"});
    res.status(500).json({error: "Server error!"});
  }
};
