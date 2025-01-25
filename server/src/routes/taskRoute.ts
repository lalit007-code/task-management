import { Router } from "express";
import {
  createTask,
  getTask,
  updateTaskStatus,
} from "../controllers/taskController";

const router = Router();

router.get("/", getTask);
router.post("/createTask", createTask);
router.patch("/updateTask/:taskId/status", updateTaskStatus);

export default router;
