import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signUpSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const forgotPasswordEmailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const verificationCodeSchema = z.object({
  code: z.string().length(6, 'Verification code must be 6 characters'),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type ForgotPasswordEmailData = z.infer<typeof forgotPasswordEmailSchema>;
export type VerificationCodeData = z.infer<typeof verificationCodeSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
