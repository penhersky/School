import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Group} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const group = await Group.findOne({name: req.body.name});
    if (group) {
      res.status(400).json({error: "The group already exists!"});
      return;
    }

    const newGroup = await Group.create({
      name: req.body.name
    });

    res.status(201).json(_.pick(newGroup, ["id", "name"]));
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "addGroup"});
    res.status(500).json({error: "Server error!"});
  }
};
