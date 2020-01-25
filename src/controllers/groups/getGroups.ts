import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Group} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const groups = await Group.find();
    res.status(200).json({
      groups: groups.map(group => _.pick(group, ["id", "name"]))
    });
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "allGroups"});
    res.status(500).json({error: "Server error!"});
  }
};
