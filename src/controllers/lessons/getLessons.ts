import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Lessons} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const lessons = await Lessons.find();

    res
      .status(200)
      .json(
        lessons.map(lesson => _.pick(lesson, ["id", "topic", "begin", "end"]))
      );
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "getLessons"});
    res.status(500).json({error: "Server error!"});
  }
};
