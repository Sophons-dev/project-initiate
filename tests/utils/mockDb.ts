import { jest } from '@jest/globals';

// Mock user data
export const mockUser = {
  id: '507f1f77bcf86cd799439011',
  clerkId: 'clerk_123456789',
  email: 'john@example.com',
  userType: 'professional' as const,
  profile: {
    name: 'John Doe',
    image: 'https://example.com/avatar.jpg',
    location: 'San Francisco, CA',
    organization: 'Tech Corp',
    position: 'Software Developer',
    website: 'https://johndoe.com',
    gender: 'Male',
    dateOfBirth: new Date('1990-01-01'),
  },
  preferences: {
    interests: ['web development', 'AI'],
    goals: 'Build scalable applications',
    preferredOpportunityTypes: ['full-time', 'remote'],
    skills: ['React', 'TypeScript', 'Node.js'],
    onboardingCompleted: true,
    preferencesUpdatedAt: new Date(),
  },
  modelData: {
    learningStyle: 'visual',
    availability: 'full-time',
    preferredWorkEnv: 'remote',
    remoteFriendly: true,
    updatedAt: new Date(),
  },
  opportunities: [],
  questionAnswers: [],
  recommendations: [],
  careerInsights: [],
  careerInsightLogs: [],
};

export const mockUserInput = {
  clerkId: 'clerk_123456789',
  name: 'John Doe',
  email: 'john@example.com',
  image: 'https://example.com/avatar.jpg',
};

export const mockProfileData = {
  name: 'John Doe',
  image: 'https://example.com/avatar.jpg',
  location: 'San Francisco, CA',
  organization: 'Tech Corp',
  position: 'Software Developer',
  website: 'https://johndoe.com',
  gender: 'Male',
  dateOfBirth: new Date('1990-01-01'),
};

export const mockPreferencesData = {
  interests: ['web development', 'AI'],
  goals: 'Build scalable applications',
  preferredOpportunityTypes: ['full-time', 'remote'],
  skills: ['React', 'TypeScript', 'Node.js'],
};

export const mockModelData = {
  learningStyle: 'visual',
  availability: 'full-time',
  preferredWorkEnv: 'remote',
  remoteFriendly: true,
};

// Mock Prisma client
export const createMockPrismaClient = () => ({
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
});

// Mock database module
export const mockDb = createMockPrismaClient();
