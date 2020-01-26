import {Request, Response} from "express";
import _ from "lodash";
import log from "../../helpers";
import {isDevelopment} from "../../config";
import {Auditory} from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const auditoryId = req.params.id;

    const auditory = await Auditory.findOne(auditoryId);
    if (auditory) {
      res.status(400).json({error: "Auditory is not found!"});
      return;
    }
    res.status(200).json(_.pick(auditory, ["id", "number", "floor", "corps"]));
  } catch (error) {
    if (isDevelopment) console.log(error);
    log.error(error.message, {path: __filename, object: "getAuditory"});
    res.status(500).json({error: "Server error!"});
  }
};
