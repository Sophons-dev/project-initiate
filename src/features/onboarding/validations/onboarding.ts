import { z } from 'zod';

export const OnboardingUserSchema = z.object({
  userType: z.enum(['student', 'professional']),
  fullName: z.string().min(1, 'Full name is required'),
  contactInfo: z.string().min(1, 'Contact info is required'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  gradeLevel: z.string(),
  school: z.string().min(1, 'School is required'),
  location: z.string().min(1, 'Location is required'),
  answers: z.record(z.string(), z.string()),
  interests: z.array(z.string().min(2, 'At least 2 characters').max(50, 'Max 50 characters')).optional(),
});

export const userInfoStep1Schema = OnboardingUserSchema.pick({
  fullName: true,
  dateOfBirth: true,
  gender: true,
});

export const userInfoStep2Schema = OnboardingUserSchema.pick({
  contactInfo: true,
  gradeLevel: true,
  school: true,
  location: true,
  interests: true,
});

export type UserInfoStep1FormData = z.infer<typeof userInfoStep1Schema>;

export type UserInfoStep2FormData = z.infer<typeof userInfoStep2Schema>;

export type UserInfoFormData = z.infer<typeof OnboardingUserSchema>;
