import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Auditory} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const allAuditory = await Auditory.find();
    res.status(200).json({
      AllAuditory: allAuditory.map(auditory =>
        _.pick(auditory, ["id", "number", "floor", "corps"])
      )
    });
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "allAuditory"});
    res.status(500).json({error: "Server error!"});
  }
};
