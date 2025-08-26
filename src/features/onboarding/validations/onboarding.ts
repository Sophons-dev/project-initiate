import { z } from 'zod';

export const userInfoSchema = z.object({
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  gradeLevel: z.string().optional(),
  school: z.string().min(1, 'School or company is required'),
  location: z.string().min(1, 'Location is required'),
});

export type UserInfoFormData = z.infer<typeof userInfoSchema>;
