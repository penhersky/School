import express from "express";

import {
  addLesson,
  deleteLesson,
  getLesson,
  getLessons,
  putLessons
} from "../controllers/lessons";

const router = express.Router();

router.get("/:id", getLesson);
router.get("/", getLessons);
router.post("/", addLesson);
router.put("/:id", putLessons);
router.delete("/:id", deleteLesson);

export default router;
