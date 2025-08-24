import { jest } from '@jest/globals';

// Mock user data
export const mockUser = {
  id: '507f1f77bcf86cd799439011',
  name: 'John Doe',
  email: 'john@example.com',
  auth0Id: 'auth0|123456789',
  image: 'https://example.com/avatar.jpg',
  profile: {
    fullName: 'John Doe',
    avatarUrl: 'https://example.com/avatar.jpg',
    bio: 'Software developer',
    location: 'San Francisco, CA',
    organization: 'Tech Corp',
    website: 'https://johndoe.com',
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
  auth0Id: 'auth0|123456789',
  roleId: '507f1f77bcf86cd799439012',
  name: 'John Doe',
  email: 'john@example.com',
  image: 'https://example.com/avatar.jpg',
};

export const mockProfileData = {
  fullName: 'John Doe',
  avatarUrl: 'https://example.com/avatar.jpg',
  bio: 'Software developer',
  location: 'San Francisco, CA',
  organization: 'Tech Corp',
  website: 'https://johndoe.com',
  interests: ['web development', 'AI'],
  goals: 'Build scalable applications',
  preferredOpportunityTypes: ['full-time', 'remote'],
  skills: ['React', 'TypeScript', 'Node.js'],
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
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
});

// Mock database module
export const mockDb = createMockPrismaClient();
