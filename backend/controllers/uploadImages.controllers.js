import fs from "fs";
import path from "path";
import { Resume } from "../models/resume.model.js";
import { upload } from "../middleware/upload.middleware.js";

export const uploadResumeImages = async (req, res) => {
  try {
    upload.fields([{ name: "thumbnail" }, { name: "profileImage" }])(
      req,
      res,
      async (err) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "File upload failed!", error: err.message });
        }

        const { resumeId } = req.params;
        const resume = await Resume.findOne({
          _id: resumeId,
          userId: req.userId,
        });
        if (!resume) {
          return res
            .status(404)
            .json({ message: "Resume not found or not authorized!" });
        }

        const uploadsFolder = path.join(process.cwd(), "uploads");
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        const newThumbnail = req.files.thumbnail?.[0];
        const newProfileImage = req.files.profileImage?.[0];

        if (newThumbnail) {
          if (resume.thumbnailLink) {
            const oldThumbnail = path.join(
              uploadsFolder,
              path.basename(resume.thumbnailLink)
            );
            if (fs.existsSync(oldThumbnail)) {
              fs.unlinkSync(oldThumbnail);
            }
            resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
          }
        }

        if (newProfileImage) {
          if (resume.profileInfo?.profilePreviewURl) {
            const oldProfile = path.join(
              uploadsFolder,
              path.basename(resume.profileInfo?.profilePreviewURl)
            );
            if (fs.existsSync(oldProfile)) {
              fs.unlinkSync(oldProfile);
            }
            resume.profileInfo.profilePreviewURl = `${baseUrl}/uploads/${newProfileImage.filename}`;
          }
        }

        await resume.save();
        return res
          .status(200)
          .json({
            message: "File uploaded successfully!",
            thumbnail: resume.thumbnailLink,
            profileImage: resume.profileInfo?.profilePreviewURl,
          });
      }
    );
  } catch (error) {
    console.log(`Error in uploadResumeImages: ${error.message}.`);
    return res
      .status(500)
      .json({ error: `Error in uploadResumeImages: ${error.message}.` });
  }
};
