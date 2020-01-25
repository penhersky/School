import {Request, Response} from "express";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Auditory} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const auditoryId = req.params.id;

    await Auditory.findByIdAndDelete(auditoryId);

    res.status(201).json({message: "Auditory deleted!"});
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "deleteAuditory"});
    res.status(500).json({error: "Server error!"});
  }
};
