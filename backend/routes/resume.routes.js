import express from "express";
import {
  createResumeController,
  deleteResumeController,
  getResumeByIdController,
  getUserResumesController,
  updateResumeController,
} from "../controllers/resume.controllers.js";
import { uploadResumeImages } from "../controllers/uploadImages.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const resumeRouter = express.Router();

resumeRouter.use(authMiddleware);
resumeRouter.post("/", createResumeController);
resumeRouter.get("/", getUserResumesController);
resumeRouter.get("/:resumeId", getResumeByIdController);
resumeRouter.put("/:resumeId", updateResumeController);
resumeRouter.delete("/:resumeId", deleteResumeController);
resumeRouter.put("/:resumeId/upload-images", uploadResumeImages);

export default resumeRouter;
