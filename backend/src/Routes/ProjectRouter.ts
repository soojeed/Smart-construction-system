import express from "express";
import { ProjectCreate } from "../Controller/projectController";


const router = express.Router();

router.post("/create", ProjectCreate)

export default router
