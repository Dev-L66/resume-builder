import crypto from 'crypto';

export const generateVerificationToken =()=>{
   return crypto.randomBytes(20).toString("hex");
}

export const generatePasswordResetToken = () => {
  return crypto.randomBytes(30).toString("hex");
};
