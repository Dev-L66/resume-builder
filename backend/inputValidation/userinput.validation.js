import { z } from "zod";

const nameSchema = z
  .string()
  .min(3, { message: "Name must be at least 3 characters" })
  .max(20, { message: "Name must be at most 20 characters" })
  .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {
    message: "Name must contain only letters and single spaces, no digits or special characters",
  }).trim();
  
 
const emailSchema = z
  .email()
  .min(3, { message: "Email must be at least 3 characters" })
  .max(30, { message: "Email must be at most 30 characters" })
  .trim();
  
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .refine((password) => !/\s/.test(password), "Password cannot contain spaces")
  .refine(
    (password) => /[A-Z]/.test(password),
    "Password must contain at least one uppercase letter"
  )
  .refine(
    (password) => /\d/.test(password),
    "Password must contain at least one digit"
  )
  .refine(
    (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password),
    "Password must contain at least one special character"
  );

export const signUpValidationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginValidationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
