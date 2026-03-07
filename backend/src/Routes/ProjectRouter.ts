import express from "express";
import { ProjectCreate } from "../Controller/projectController";
import { authenticate } from "../middleware/authenticate-middleware";


const router = express.Router();

router.post("/create",authenticate, ProjectCreate)

export default router
