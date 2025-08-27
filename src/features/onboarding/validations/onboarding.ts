import { z } from 'zod';

export const userInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  contactInfo: z.string().min(1, 'Contact info is required'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  gradeLevel: z.string().optional(),
  school: z.string().min(1, 'School is required'),
  location: z.string().min(1, 'Location is required'),
  interests: z
    .array(
      z.string().min(2, 'At least 2 characters').max(20, 'Max 20 characters')
    )
    .optional(),
});

export type UserInfoFormData = z.infer<typeof userInfoSchema>;
