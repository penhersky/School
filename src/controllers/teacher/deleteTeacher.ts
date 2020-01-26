import {Request, Response} from "express";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Teachers} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const teachersId = req.params.id;

    await Teachers.findByIdAndDelete(teachersId);

    res.status(201).json({message: "Teacher deleted!"});
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "deleteTeacher"});
    res.status(500).json({error: "Server error!"});
  }
};
