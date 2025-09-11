import { z } from 'zod';

export const RecommendationSchema = z.object({
  type: z.enum(['JOB', 'COURSE', 'SCHOLARSHIP', 'EVENT']).describe('The type of opportunity being recommended'),

  title: z.string().describe('The job title or opportunity name'),
  description: z.string().describe('Brief summary of the opportunity'),
  matchReason: z.string().describe('Explanation of why this opportunity matches the user'),

  // Core job details
  jobDescription: z.string().describe('Detailed job description and role overview'),
  responsibilities: z.array(z.string()).describe('Key responsibilities and duties'),
  requirements: z.array(z.string()).describe('Required qualifications, skills, and experience'),
  benefits: z.array(z.string()).describe('Compensation and benefits offered'),

  organization: z.object({
    name: z.string().describe('Company or organization name'),
    type: z
      .enum(['company', 'university', 'bootcamp', 'online_platform', 'government', 'ngo', 'other'])
      .describe('Type of organization'),
    aboutTheCompany: z.string().describe('Company description and background'),
    industry: z.string().describe('Industry sector the company operates in'),
    employmentSize: z
      .enum(['1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+'])
      .describe('Company size by number of employees'),
    companyRating: z.number().describe('Company rating from job platforms (e.g., 4.0)'),
    reviewCount: z.number().describe('Number of company reviews'),
  }),

  location: z.object({
    type: z.enum(['remote', 'onsite', 'hybrid']).describe('Work arrangement type'),
    city: z.string().describe('City where the job is located'),
    country: z.string().describe('Country where the job is located'),
    workLocation: z.string().describe('Specific work location details'),
  }),

  url: z.string().describe('URL to the job posting or application page'),

  // Important dates
  postedDate: z.string().describe('When the job was posted'),
  applicationDeadline: z.string().describe('Application deadline'),
  daysAgoPosted: z.string().describe('How many days ago the job was posted (e.g., "7d ago")'),

  // Core metadata for AI matching
  metadata: z.object({
    salary: z.object({
      min: z.number().describe('Minimum salary amount'),
      max: z.number().describe('Maximum salary amount'),
      currency: z.string().describe('Salary currency (e.g., "PHP", "USD")'),
      isSpecified: z.boolean().describe('Whether salary information is provided'),
      range: z.string().describe('Salary range description (e.g., "₱90,000 – ₱110,000 per month")'),
    }),

    requiredSkills: z.array(z.string()).describe('Technical and soft skills required for the role'),
    yearsOfExperience: z.string().describe('Required years of experience (e.g., "5-6 years")'),
    educationLevel: z.string().describe('Required education level'),
    employmentType: z
      .enum(['full-time', 'part-time', 'contract', 'internship', 'freelance', 'temporary'])
      .describe('Type of employment'),

    // Job classification
    jobCategory: z.string().describe('Job category (e.g., "Developers/Programmers")'),
    jobSubCategory: z.string().describe('Job subcategory (e.g., "Information & Communication Technology")'),

    // Match scoring for relevance
    matchScore: z.object({
      skillsMatched: z.number().describe('Number of skills that match user profile'),
      skillsList: z.array(z.string()).describe('List of matching skills'),
    }),

    // Application process
    employerQuestions: z.array(z.string()).describe('Questions employers ask during application'),
  }),

  // Company benefits
  companyBenefits: z.object({
    flexibility: z.array(z.string()).describe('Work flexibility benefits (remote work, flexible hours)'),
    wellBeing: z.array(z.string()).describe('Health and wellness benefits'),
    careerDevelopment: z.array(z.string()).describe('Learning and career growth opportunities'),
    perks: z.array(z.string()).describe('Additional perks and benefits'),
  }),
});

export const RecommendationsSchema = z.object({
  recommendations: z.array(RecommendationSchema),
});

export type Recommendation = z.infer<typeof RecommendationSchema>;
