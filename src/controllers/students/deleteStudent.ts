import {Request, Response} from "express";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Students} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    await Students.findByIdAndDelete(userId);

    res.status(201).json({message: "Student deleted!"});
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "deleteStudent"});
    res.status(500).json({error: "Server error!"});
  }
};
