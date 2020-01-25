import express from "express";

import {
  addStudents,
  getStudents,
  getStudent,
  putStudents,
  deleteStudent
} from "../controllers/students";

const router = express.Router();

router.get("/:id", getStudent);
router.get("/", getStudents);
router.post("/", addStudents);
router.put("/:id", putStudents);
router.delete("/:id", deleteStudent);

export default router;
