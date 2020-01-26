import {Request, Response} from "express";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Lessons} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const lessonsId = req.params.id;

    await Lessons.findByIdAndDelete(lessonsId);

    res.status(201).json({message: "Lessons deleted!"});
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "deleteLesson"});
    res.status(500).json({error: "Server error!"});
  }
};
