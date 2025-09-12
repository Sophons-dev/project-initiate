import { z } from 'zod';

export const OpportunitySchema = z.object({
  type: z.enum(['job', 'course', 'event']).describe('The type of opportunity being recommended'),
  subtype: z
    .enum([
      // Job subtypes
      'full_time',
      'part_time',
      'contract',
      'internship',
      'freelance',
      'temporary',

      // Course subtypes
      'school_course',
      'online_cert',
      'online_degree',
      'bootcamp',

      // Event subtypes
      'conference',
      'seminar',
      'webinar',
      'workshop',
      'meetup',
      'hackathon',
      'networking',

      // Common subtype
      'other',
    ])
    .describe('The subtype of the opportunity'),
  title: z.string().describe('The opportunity title or name'),
  shortDescription: z.string().describe('A brief summary or tagline for the opportunity good and fit for card'),
  longDescription: z
    .string()
    .describe(
      'Long description of the opportunity. Description that can help give more context about the opportunity.'
    ),
  matchReason: z.string().describe('Reason why this opportunity is a good match'),

  // Generic content fields (work for all types)
  tags: z.array(z.string()).describe('Relevant tags and keywords'),
  highlights: z.array(z.string()).describe('Key points, features, or agenda items'),
  prerequisites: z.array(z.string()).describe('Requirements or prerequisites'),
  outcomes: z.array(z.string()).describe('Benefits, outcomes, or what attendees will gain'),

  // Location details
  location: z.object({
    type: z.enum(['remote', 'onsite', 'hybrid']).describe('Location arrangement type'),
    city: z.string().describe('City where the opportunity is located'),
    country: z.string().describe('Country where the opportunity is located'),
    workLocation: z.string().describe('Specific work location or venue details'),
  }),

  // Contact and application
  url: z.string().describe('URL to the opportunity posting or application page'),
  contactEmail: z.string().describe('Contact email for inquiries'),
  contactPhone: z.string().describe('Contact phone number'),

  // Important dates
  postedDate: z.string().describe('When the opportunity was posted'),
  applicationDeadline: z.string().describe('Application deadline'),
  startDate: z.string().describe('Start date for courses and events'),
  endDate: z.string().describe('End date for courses and events'),

  // Organization details
  organization: z.object({
    name: z.string().describe('Company or organization name'),
    type: z
      .enum(['company', 'university', 'bootcamp', 'online_platform', 'government', 'ngo', 'other'])
      .describe('Type of organization'),
    aboutTheCompany: z.string().describe('Organization description and background'),
    website: z.string().describe('Organization website URL'),
    logoUrl: z.string().describe('URL to the organization logo image'),
    location: z.string().describe('Headquarters or main location of the organization'),
    organizationUrl: z.string().describe('Link to the organization profile or page'),
    industry: z.string().describe('Industry sector the organization operates in'),
    employmentSize: z
      .enum(['1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+'])
      .describe('Organization size by number of employees'),
    companyRating: z.number().describe('Organization rating from platforms (e.g., 4.0)'),
    reviewCount: z.number().describe('Number of organization reviews'),
  }),

  // Type-specific metadata (JSON)
  metadata: z.object({
    // Job-specific metadata
    salary: z.object({
      min: z.number().describe('Minimum salary amount'),
      max: z.number().describe('Maximum salary amount'),
      currency: z.string().describe('Salary currency (e.g., "PHP", "USD")'),
      isSpecified: z.boolean().describe('Whether salary information is provided'),
      range: z.string().describe('Salary range description (e.g., "₱90,000 – ₱110,000 per month")'),
    }),
    employmentType: z
      .enum(['full-time', 'part-time', 'contract', 'internship', 'freelance', 'temporary'])

      .describe('Type of employment for jobs'),

    yearsOfExperience: z.string().describe('Required years of experience (e.g., "5-6 years")'),
    jobCategory: z.string().describe('Job category (e.g., "Developers/Programmers")'),
    jobSubCategory: z.string().describe('Job subcategory (e.g., "Information & Communication Technology")'),

    // Course-specific metadata
    tuition: z.object({
      min: z.number().describe('Minimum tuition amount'),
      max: z.number().describe('Maximum tuition amount'),
      currency: z.string().describe('Tuition currency (e.g., "PHP", "USD")'),
      isSpecified: z.boolean().describe('Whether tuition information is provided'),
      range: z.string().describe('Tuition range description'),
    }),
    difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced']).describe('Course difficulty level'),
    duration: z.string().describe('Course duration (e.g., "12 weeks", "6 months")'),
    courseCategory: z.string().describe('Course category (e.g., "Programming", "Design")'),
    certification: z.boolean().describe('Whether course provides certification'),

    // Event-specific metadata
    ticketPrice: z.object({
      min: z.number().describe('Minimum ticket price'),
      max: z.number().describe('Maximum ticket price'),
      currency: z.string().describe('Price currency (e.g., "PHP", "USD")'),
      isSpecified: z.boolean().describe('Whether ticket price information is provided'),
      range: z.string().describe('Price range description'),
    }),
    capacity: z.number().describe('Maximum number of attendees'),
    format: z.string().describe('Event format (e.g., "In-person", "Virtual", "Hybrid")'),
    speakers: z.array(z.string()).describe('List of event speakers or instructors'),
    eventCategory: z.string().describe('Event category (e.g., "Technology", "Business")'),

    // Common metadata
    requiredSkills: z.array(z.string()).describe('Technical and soft skills required'),
    educationLevel: z.string().describe('Required education level'),
    matchScore: z.object({
      skillsMatched: z.number().describe('Number of skills that match user profile'),
      skillsList: z.array(z.string()).describe('List of matching skills'),
    }),
  }),

  // Organization benefits/features (JSON)
  organizationBenefits: z.object({
    flexibility: z.array(z.string()).describe('Work flexibility benefits (remote work, flexible hours)'),
    wellBeing: z.array(z.string()).describe('Health and wellness benefits'),
    careerDevelopment: z.array(z.string()).describe('Learning and career growth opportunities'),
    perks: z.array(z.string()).describe('Additional perks and benefits'),
  }),
});

export const RecommendationsSchema = z.object({
  recommendations: z.array(OpportunitySchema),
});

export type Recommendation = z.infer<typeof OpportunitySchema>;
