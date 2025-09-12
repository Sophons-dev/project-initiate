import { OrganizationDto } from '@/features/organizations/dto/organization.dto';
import { OpportunitySubtype, OpportunityType } from '@prisma/client';

export type OpportunityDto = {
  id: string;
  type: OpportunityType;
  subtype: OpportunitySubtype;
  title: string;
  shortDescription: string;
  longDescription: string;
  matchReason?: string;

  // Generic content fields (work for all types)
  tags: string[];
  highlights: string[];
  prerequisites: string[];
  outcomes: string[];

  // Location details
  location: {
    type: 'remote' | 'onsite' | 'hybrid';
    city: string;
    country: string;
    workLocation: string;
  };

  // Contact and application
  url: string;
  contactEmail?: string;
  contactPhone?: string;

  // Important dates
  postedDate: string;
  applicationDeadline: string;
  startDate?: string;
  endDate?: string;

  // Type-specific metadata (JSON)
  metadata: {
    // Job-specific metadata
    salary?: {
      min: number;
      max: number;
      currency: string;
      isSpecified: boolean;
      range: string;
    };
    employmentType?: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance' | 'temporary';
    yearsOfExperience?: string;
    jobCategory?: string;
    jobSubCategory?: string;

    // Course-specific metadata
    tuition?: {
      min: number;
      max: number;
      currency: string;
      isSpecified: boolean;
      range: string;
    };
    difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
    duration?: string;
    courseCategory?: string;
    certification?: boolean;

    // Event-specific metadata
    ticketPrice?: {
      min: number;
      max: number;
      currency: string;
      isSpecified: boolean;
      range: string;
    };
    capacity?: number;
    format?: string;
    speakers?: string[];
    eventCategory?: string;

    // Common metadata
    requiredSkills: string[];
    educationLevel: string;
    matchScore: {
      skillsMatched: number;
      skillsList: string[];
    };
  };

  // Organization benefits/features (JSON)
  organizationBenefits: {
    flexibility: string[];
    wellBeing: string[];
    careerDevelopment: string[];
    perks: string[];
  };

  // Organization reference
  organizationId: string;
  organization?: OrganizationDto | null;

  // System fields
  createdBy: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

// Omit 'matchReason' because it's not in Opportunity model in Prisma
export type CreateOpportunityDto = Omit<OpportunityDto, 'id' | 'matchReason' | 'createdAt' | 'updatedAt'>;

export type UpdateOpportunityDto = Partial<CreateOpportunityDto>;
