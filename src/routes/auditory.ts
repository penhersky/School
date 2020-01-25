import express from "express";

import {
  addAuditory,
  deleteAuditory,
  getAuditory,
  getAllAuditory
} from "../controllers/auditory";

const router = express.Router();

router.get("/:id", getAuditory);
router.get("/", getAllAuditory);
router.post("/", addAuditory);
router.delete("/:id", deleteAuditory);

export default router;
