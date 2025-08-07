import { Resume } from "../models/resume.model.js";
import { User } from "../models/user.model.js";
import path from "path";
import fs from "fs";

//create resume controller
export const createResumeController = async (req, res) => {
  try {
    const { title } = req.body;
    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        previewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        website: "",
      },
      workExperience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        },
      ],
      skills: [
        {
          name: "",
          progress: 0,
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          github: "",
          liveDemo: "",
        },
      ],
      certifications: [
        {
          title: "",
          issuer: "",
          year: "",
        },
      ],
      languages: [
        {
          name: "",
          progress: "",
        },
      ],
      interests: [""],
    };

    const newResume = await Resume.create({
      userId: req.userId,
      title,
      ...defaultResumeData,
      ...req.body,
    });
    res
      .status(200)
      .json({ message: "Resume created successfully!", newResume });
  } catch (error) {
    console.log(`Error in createResumeController: ${error.message}.`);
    return res.status(500).json({
      error: `Failed to create resume. Error in createResumeController: ${error.message}.`,
    });
  }
};

//get user resumes controller
export const getUserResumesController = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const resume = await Resume.findById({ userId: user._id }).sort({
      updateAt: -1,
    });
    if (!resume) {
      return res.status(404).json({ message: "Resume/s not found!" });
    }
    return res.status(200).json({ resume });
  } catch (error) {
    console.log(`Error in getUserResumesController: ${error.message}.`);
    return res.status(500).json({
      error: `Error in getUserResumesController: ${error.message}.`,
    });
  }
};

//get resume by id controller
export const getResumeByIdController = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ _id: resumeId, userId: req.userId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found!" });
    }
    return res.status(200).json({ resume });
  } catch (error) {
    console.log(`Error in getResumeByIdController: ${error.message}.`);
    return res.status(500).json({
      error: `Error in getResumeByIdController: ${error.message}.`,
    });
  }
};

//update resume controller
export const updateResumeController = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ _id: resumeId, userId: req.userId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found!" });
    }
    const updatedResume = await Resume.findOne(
      { _id_: resumeId, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedResume) {
      return res.status(400).json({ message: "Error in updating resume!" });
    }
    return res.status(200).json({ updatedResume });
  } catch (error) {
    console.log(`Error in updateResumeController: ${error.message}.`);
    return res.status(500).json({
      error: `Error in updateResumeController: ${error.message}.`,
    });
  }
};

//delete resume controller
export const deleteResumeController = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ _id: resumeId, userId: req.userId });
    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or not authorized!" });
    }
    const uploadsFolder = path.join(process.cwd(), "uploads");
    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(
        uploadsFolder,
        path.basename(resume.thumbnailLink)
      );
      if (fs.existsSync(oldThumbnail)) {
        fs.unlinkSync(oldThumbnail);
      }
      if (resume.profileInfo?.profilePreviewURl) {
        const oldProfile = path.join(
          uploadsFolder,
          path.basename(resume.profileInfo.profilePreviewURl)
        );
        if (fs.existsSync(oldProfile)) {
          fs.unlinkSync(oldProfile);
        }
      }
    }
    const deletedResume = await Resume.deleteOne({
      _id: resumeId,
      userId: req.userId,
    });

    if (!deletedResume) {
      return res.status(400).json({ message: "Error in deleting resume!" });
    }

    return res.status(200).json({ message: "Resume deleted successfully!" });
  } catch (error) {
    console.log(`Error in deleteResumeController: ${error.message}.`);
    return res.status(500).json({
      error: `Error in deleteResumeController: ${error.message}.`,
    });
  }
};
