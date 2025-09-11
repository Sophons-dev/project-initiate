import { OrganizationDto } from '@/features/organizations/dto/organization.dto';
import { OpportunitySubtype, OpportunityType } from '@prisma/client';

export type OpportunityDto = {
  id: string;
  type: OpportunityType;
  subtype: OpportunitySubtype;
  title: string;
  description: string;
  matchReason: string;

  // Core job details
  jobDescription: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];

  location: {
    type: 'remote' | 'onsite' | 'hybrid';
    city: string;
    country: string;
    workLocation: string;
  };

  url: string;

  // Important dates
  postedDate: string;
  applicationDeadline: string;
  daysAgoPosted: string;

  // Core metadata for AI matching
  metadata: {
    salary: {
      min: number;
      max: number;
      currency: string;
      isSpecified: boolean;
      range: string;
    };
    requiredSkills: string[];
    yearsOfExperience: string;
    educationLevel: string;
    employmentType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance' | 'temporary';
    jobCategory: string;
    jobSubCategory: string;
    matchScore: {
      skillsMatched: number;
      skillsList: string[];
    };
    employerQuestions: string[];
  };

  // Company benefits
  companyBenefits: {
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

export type CreateOpportunityDto = Omit<OpportunityDto, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateOpportunityDto = Partial<CreateOpportunityDto>;
