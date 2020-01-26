import express from "express";

import {
  addTeacher,
  deleteTeacher,
  getTeacher,
  getTeachers,
  putTeacher
} from "../controllers/teacher";

const router = express.Router();

router.get("/:id", getTeacher);
router.get("/", getTeachers);
router.post("/", addTeacher);
router.put("/:id", putTeacher);
router.delete("/:id", deleteTeacher);

export default router;
