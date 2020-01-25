import express from "express";

import {
  addGroup,
  getGroup,
  deleteGroup,
  getGroups
} from "../controllers/groups";

const router = express.Router();

router.get("/:id", getGroup);
router.get("/", getGroups);
router.post("/", addGroup);
router.delete("/:id", deleteGroup);

export default router;
