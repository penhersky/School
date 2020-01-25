import {Request, Response} from "express";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Group} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const groupId = req.params.id;

    await Group.findByIdAndDelete(groupId);

    res.status(201).json({message: "Group deleted!"});
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "deleteGroup"});
    res.status(500).json({error: "Server error!"});
  }
};
