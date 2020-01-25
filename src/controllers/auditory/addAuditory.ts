import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Auditory} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const auditory = await Auditory.findOne({
      number: req.body.number,
      floor: req.body.floor,
      corps: req.body.corps
    });
    if (auditory) {
      res.status(400).json({error: "The auditory already exists!"});
      return;
    }

    const newStudent = await Auditory.create({
      number: req.body.number,
      floor: req.body.floor,
      corps: req.body.corps
    });

    res
      .status(201)
      .json(_.omit(newStudent, ["id", "number", "floor", "corps"]));
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "addAuditory"});
    res.status(500).json({error: "Server error!"});
  }
};
