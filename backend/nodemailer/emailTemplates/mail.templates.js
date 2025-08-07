import { transporter } from "../nodemailer.config.js";

//send verification mail
export const sendVerificationMail = async (email, verificationUrl) => {
  try {
    const info = await transporter.sendMail({
      from: `Resume-builder ${process.env.MAIL_USER}`,
      to: email,
      subject: "Welcome to resume-builder, please verify your account.",
      html: `<h1 class="text-2xl text-blue-700"> Please click on this link to verify your account:</h1> <h2 class="text-2xl text-blue-900">The link will expire in 10 minutes: <a href="${verificationUrl}">${verificationUrl}</a></h2>`,
    });

    console.log(`sendVerificationMail sent successfully: ${info.messageId}.`);
  } catch (error) {
    console.log(`Error sending sendVerificationMail: ${error.message}.`);
  }
};

//send verified mail
export const sendVerifiedMail = async (name, email) => {
  try {
    const info = await transporter.sendMail({
      from: `Resume-builder ${process.env.MAIL_USER}`,
      to: email,
      subject: `Welcome to resume-builder ${name}`,
      html: `<h1 class="text-2xl text-blue-700"> Your account has been verified successfully!</h1>`,
    });

    console.log(`sendVerificationMail sent successfully: ${info.messageId}`);
  } catch (error) {
    console.log(`Error sending sendVerificationMail: ${error.message}`);
  }
};

//send reset password mail
export const sendResetPasswordMail = async (email, resetPasswordUrl) => {
  try {
    const info = await transporter.sendMail({
      from: `Resume-builder ${process.env.MAIL_USER}`,
      to: email,
      subject: "Welcome to resume-builder, please verify your account.",
      html: `<h1 class="text-2xl text-blue-700"> Please click on this link to reset your password:</h1> <h2 class="text-2xl text-blue-900">The link will expire in 10 minutes: <a href="${resetPasswordUrl}">${resetPasswordUrl}</a></h2>`,
    });

    console.log(`sendResetPasswordMail sent successfully: ${info.messageId}.`);
  } catch (error) {
    console.log(`Error sending sendResetPasswordMail: ${error.message}.`);
  }
};

//send reset password successful mail
export const sendResetPasswordMailSuccessful = async (email) => {
  try {
    const infor = await transporter.sendMail({
      from: `Resume-builder ${process.env.MAIL_USER}`,
      to: email,
      subject: "Password reset successful",
      html: `<h1 class="text-2xl text-blue-700">Password reset successful. You can now login with your new password.</h1>`,
    });
    console.log(
      `sendResetPasswordMailSuccessful sent successfully: ${infor.messageId}.`
    );
  } catch (error) {
    console.log(`Error sending resetPasswordMAilSuccessful: ${error.message}.`);
  }
};
