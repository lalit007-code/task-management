import { Router } from "express";
import { createProject, getprojects } from "../controllers/projectController";

const router = Router();

router.get("/", getprojects);
router.post("/createProject", createProject);

export default router;
