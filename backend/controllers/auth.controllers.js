import { ZodError } from "zod";
import {
  loginValidationSchema,
  signUpValidationSchema,
} from "../inputValidation/userinput.validation.js";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import {
  generatePasswordResetToken,
  generateVerificationToken,
} from "../utils/verification.token.js";
import {
  sendResetPasswordMail,
  sendResetPasswordMailSuccessful,
  sendVerificationMail,
  sendVerifiedMail,
} from "../nodemailer/emailTemplates/mail.templates.js";
import { generateToken } from "../utils/generateToken.js";
import "dotenv/config";

//signup controller
export const signUpController = async (req, res) => {
  try {
    const { name, email, password } = signUpValidationSchema.parse(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already taken!" });
    }

    const verificationToken = generateVerificationToken();
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 10 * 60 * 1000), //
    });

    if (!newUser) {
      return res
        .status(500)
        .json({ message: `Error creating user: ${error.message}.` });
    }

    const verificationUrl = `${process.env.URL}/verify-email?token=${verificationToken}`;
   const token = generateToken(newUser._id);
   console.log(token);
    await sendVerificationMail(newUser.email, verificationUrl);
    return res.status(201).json({
      message: "User created successully!",
      user: {
        token,
        ...newUser._doc,
        password: undefined,
        verificationToken: undefined,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.issues.map((issue) => issue.message) });
    }
    console.log(`Error in signUpController: ${error.message}.`);
    return res
      .status(500)
      .json({ error: `Error in signUpController: ${error.message}.` });
  }
};

// verify email controller
export const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Token is required or invalid! Please try again!" });
    }
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired token! Please try again!" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified!" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    await sendVerifiedMail(user.name, user.email);
    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.log(`Error in verifyEmailController: ${error.message}.`);
    return res
      .status(500)
      .json({ error: `Error in verifyEmailController: ${error.message}.` });
  }
};

//resend verification controller
export const resendVerificationController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified." });
    }
    const verificationToken = generateVerificationToken();
    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    const verificationUrl = `${process.env.URL}/verify-email?token=${verificationToken}`;
    await sendVerificationMail(user.email, verificationUrl);
    return res
      .status(200)
      .json({ message: "Verification token sent successfully!" });
  } catch (error) {
    console.log(`Error in resendVerificationController: ${error.message}.`);
    return res.status(500).json({
      error: `Error in resendVerificationController: ${error.message}.`,
    });
  }
};

//login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = loginValidationSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const matchPassword = await bcryptjs.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "Please verify your email to login." });
    }
    generateToken(user._id);
    return res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.log(`Error in loginController: ${error.message}.`);
    return res.status(500).json({
      error: `Error in loginController: ${error.message}.`,
    });
  }
};

//forgot password controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found. Invalid email!" });
    }
    const resetPassswordToken = generatePasswordResetToken();
    user.resetPassswordToken = resetPassswordToken;
    user.resetPasswordTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const resetPasswordUrl = `${process.env.URL}/reset-password/${resetPassswordToken}`;
    await sendResetPasswordMail(user.email, resetPasswordUrl);
    return res
      .status(200)
      .json({ message: "Reset password token sent successfully!" });
  } catch (error) {
    console.log(`Error in forgotPasswordController: ${error.message}.`);
    return res.status(500).json({
      error: `Error in forgotPasswordController: ${error.message}.`,
    });
  }
};

//reset password controller
export const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPassswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired token! Please try again!" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPassswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();
    sendResetPasswordMailSuccessful(user.email);
    return res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.log(`Error in restPasswordController: ${error.message}`);
    return res.status(500).json({
      error: `Error in resetPasswordController: ${error.message}`,
    });
  }
};

//check auth controller
export const checkAuthController = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    return res.status(200).json({ message: "User found!", user });
  } catch (error) {
    console.log(`Error in checkAuthController: ${error.message}.`);
    return res.status(500).json({
      error: `Error in checkAuthController: ${error.message}.`,
    });
  }
};
