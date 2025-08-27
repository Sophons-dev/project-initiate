import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from '@jest/globals';
import {
  mockDb,
  mockUser,
  mockUserInput,
  mockProfileData,
  mockPreferencesData,
  mockModelData,
} from '../../../utils/mockDb';

// Mock the database module
jest.mock('@/lib/db', () => ({
  db: mockDb,
}));

// Import the actions after mocking
import {
  createUser,
  updateUserProfile,
  getUserById,
  updateUser,
  deleteUser,
  updateOnboardingStatus,
  updateUserPreferences,
  updateUserModelData,
  updateUserType,
  getUserByClerkId,
} from '@/features/user/actions';

describe('User Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createUser', () => {
    it('should create a user successfully with minimal data', async () => {
      const userData = {
        clerkId: 'clerk_123456789',
        name: 'John Doe',
        email: 'john@example.com',
        image: 'https://example.com/avatar.jpg',
      };

      const expectedUser = {
        id: '507f1f77bcf86cd799439011',
        clerkId: userData.clerkId,
        email: userData.email,
        profile: {
          name: userData.name,
          image: userData.image,
        },
        preferences: {
          interests: [],
          preferredOpportunityTypes: [],
          skills: [],
          onboardingCompleted: false,
          preferencesUpdatedAt: expect.any(Date),
        },
        modelData: {
          learningStyle: null,
          availability: null,
          preferredWorkEnv: null,
          remoteFriendly: null,
          updatedAt: expect.any(Date),
        },
      };

      mockDb.user.create.mockResolvedValue(expectedUser);

      const result = await createUser(userData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(expectedUser);
      expect(mockDb.user.create).toHaveBeenCalledWith({
        data: {
          clerkId: userData.clerkId,
          email: userData.email,
          profile: {
            name: userData.name,
            image: userData.image,
          },
          preferences: {
            interests: [],
            preferredOpportunityTypes: [],
            skills: [],
            onboardingCompleted: false,
            preferencesUpdatedAt: expect.any(Date),
          },
          modelData: {
            learningStyle: null,
            availability: null,
            preferredWorkEnv: null,
            remoteFriendly: null,
            updatedAt: expect.any(Date),
          },
        },
      });
    });

    it('should create a user with only required clerkId', async () => {
      const userData = {
        clerkId: 'clerk_123456789',
      };

      const expectedUser = {
        id: '507f1f77bcf86cd799439011',
        clerkId: userData.clerkId,
        profile: {
          name: undefined,
          image: undefined,
        },
        preferences: {
          interests: [],
          preferredOpportunityTypes: [],
          skills: [],
          onboardingCompleted: false,
          preferencesUpdatedAt: expect.any(Date),
        },
        modelData: {
          learningStyle: null,
          availability: null,
          preferredWorkEnv: null,
          remoteFriendly: null,
          updatedAt: expect.any(Date),
        },
      };

      mockDb.user.create.mockResolvedValue(expectedUser);

      const result = await createUser(userData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(expectedUser);
      expect(mockDb.user.create).toHaveBeenCalledWith({
        data: {
          clerkId: userData.clerkId,
          email: undefined,
          profile: {
            name: undefined,
            image: undefined,
          },
          preferences: {
            interests: [],
            preferredOpportunityTypes: [],
            skills: [],
            onboardingCompleted: false,
            preferencesUpdatedAt: expect.any(Date),
          },
          modelData: {
            learningStyle: null,
            availability: null,
            preferredWorkEnv: null,
            remoteFriendly: null,
            updatedAt: expect.any(Date),
          },
        },
      });
    });

    it('should handle database errors', async () => {
      const userData = {
        clerkId: 'clerk_123456789',
        name: 'John Doe',
      };

      const error = new Error('Database connection failed');
      mockDb.user.create.mockRejectedValue(error);

      const result = await createUser(userData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to create user');
    });
  });

  describe('updateUserProfile', () => {
    it('should update user profile successfully', async () => {
      const profileData = {
        name: 'Jane Doe',
        image: 'https://example.com/new-avatar.jpg',
        location: 'New York',
        organization: 'Tech Corp',
        position: 'Software Engineer',
        website: 'https://janedoe.com',
        gender: 'Female',
        dateOfBirth: new Date('1990-01-01'),
      };

      const updatedUser = { ...mockUser, profile: profileData };
      mockDb.user.update.mockResolvedValue(updatedUser);

      const result = await updateUserProfile(mockUser.id, profileData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(updatedUser);
      expect(mockDb.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          profile: profileData,
        },
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Update failed');
      mockDb.user.update.mockRejectedValue(error);

      const result = await updateUserProfile(mockUser.id, { name: 'Jane Doe' });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to update user profile');
    });
  });

  describe('getUserById', () => {
    it('should get user by ID successfully', async () => {
      mockDb.user.findUnique.mockResolvedValue(mockUser);

      const result = await getUserById(mockUser.id);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUser);
      expect(mockDb.user.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        include: {
          opportunities: true,
          questionAnswers: true,
          recommendations: true,
          careerInsights: true,
          careerInsightLogs: true,
        },
      });
    });

    it('should return error when user not found', async () => {
      mockDb.user.findUnique.mockResolvedValue(null);

      const result = await getUserById('nonexistent-id');

      expect(result.success).toBe(false);
      expect(result.error).toBe('User not found');
    });

    it('should handle database errors', async () => {
      const error = new Error('Database error');
      mockDb.user.findUnique.mockRejectedValue(error);

      const result = await getUserById(mockUser.id);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to fetch user');
    });
  });

  describe('getUserByClerkId', () => {
    it('should get user by Clerk ID successfully', async () => {
      mockDb.user.findFirst.mockResolvedValue(mockUser);

      const result = await getUserByClerkId('clerk_123456789');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUser);
      expect(mockDb.user.findFirst).toHaveBeenCalledWith({
        where: { clerkId: 'clerk_123456789' },
        include: {
          opportunities: true,
          questionAnswers: true,
          recommendations: true,
          careerInsights: true,
          careerInsightLogs: true,
        },
      });
    });

    it('should return error when user not found', async () => {
      mockDb.user.findFirst.mockResolvedValue(null);

      const result = await getUserByClerkId('nonexistent-clerk-id');

      expect(result.success).toBe(false);
      expect(result.error).toBe('User not found');
    });

    it('should handle database errors', async () => {
      const error = new Error('Database error');
      mockDb.user.findFirst.mockRejectedValue(error);

      const result = await getUserByClerkId('clerk_123456789');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to fetch user');
    });
  });

  describe('updateUser', () => {
    it('should update user basic fields successfully', async () => {
      const updateData = { email: 'jane@example.com' };
      const updatedUser = { ...mockUser, ...updateData };
      mockDb.user.update.mockResolvedValue(updatedUser);

      const result = await updateUser(mockUser.id, updateData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(updatedUser);
      expect(mockDb.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: updateData,
      });
    });

    it('should update user profile fields successfully', async () => {
      const updateData = {
        name: 'Jane Doe',
        location: 'New York',
        organization: 'Tech Corp',
        position: 'Senior Engineer',
      };
      const updatedUser = {
        ...mockUser,
        profile: { ...mockUser.profile, ...updateData },
      };
      mockDb.user.update.mockResolvedValue(updatedUser);

      const result = await updateUser(mockUser.id, updateData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(updatedUser);
      expect(mockDb.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          profile: {
            name: 'Jane Doe',
            location: 'New York',
            organization: 'Tech Corp',
            position: 'Senior Engineer',
            image: undefined,
            website: undefined,
            gender: undefined,
            dateOfBirth: undefined,
          },
        },
      });
    });

    it('should update user preferences fields successfully', async () => {
      const updateData = {
        interests: ['AI', 'Machine Learning'],
        skills: ['Python', 'TensorFlow'],
      };
      const updatedUser = {
        ...mockUser,
        preferences: {
          ...mockUser.preferences,
          ...updateData,
          preferencesUpdatedAt: expect.any(Date),
        },
      };
      mockDb.user.update.mockResolvedValue(updatedUser);

      const result = await updateUser(mockUser.id, updateData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(updatedUser);
      expect(mockDb.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          preferences: {
            interests: ['AI', 'Machine Learning'],
            skills: ['Python', 'TensorFlow'],
            goals: undefined,
            preferredOpportunityTypes: undefined,
            preferencesUpdatedAt: expect.any(Date),
          },
        },
      });
    });

    it('should update user model data fields successfully', async () => {
      const updateData = {
        learningStyle: 'visual',
        availability: 'full-time',
        preferredWorkEnv: 'remote',
        remoteFriendly: true,
      };
      const updatedUser = {
        ...mockUser,
        modelData: {
          ...mockUser.modelData,
          ...updateData,
          updatedAt: expect.any(Date),
        },
      };
      mockDb.user.update.mockResolvedValue(updatedUser);

      const result = await updateUser(mockUser.id, updateData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(updatedUser);
      expect(mockDb.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          modelData: {
            learningStyle: 'visual',
            availability: 'full-time',
            preferredWorkEnv: 'remote',
            remoteFriendly: true,
            updatedAt: expect.any(Date),
          },
        },
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Update failed');
      mockDb.user.update.mockRejectedValue(error);

      const result = await updateUser(mockUser.id, {
        email: 'jane@example.com',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to update user');
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      mockDb.user.delete.mockResolvedValue(mockUser);

      const result = await deleteUser(mockUser.id);

      expect(result.success).toBe(true);
      expect(mockDb.user.delete).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Delete failed');
      mockDb.user.delete.mockRejectedValue(error);

      const result = await deleteUser(mockUser.id);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to delete user');
    });
  });

  describe('updateUserType', () => {
    it('should update user type successfully', async () => {
      const updatedUser = { ...mockUser, userType: 'professional' };
      mockDb.user.update.mockResolvedValue(updatedUser);

      const result = await updateUserType(mockUser.id, 'professional');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(updatedUser);
      expect(mockDb.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          userType: 'professional',
        },
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Update failed');
      mockDb.user.update.mockRejectedValue(error);

      const result = await updateUserType(mockUser.id, 'student');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to update user type');
    });
  });

  describe('updateUserPreferences', () => {
    it('should update user preferences successfully', async () => {
      const updatedUser = {
        ...mockUser,
        preferences: { ...mockUser.preferences, ...mockPreferencesData },
      };
      mockDb.user.update.mockResolvedValue(updatedUser);

      const result = await updateUserPreferences(
        mockUser.id,
        mockPreferencesData
      );

      expect(result.success).toBe(true);
      expect(result.data).toEqual(updatedUser);
      expect(mockDb.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          preferences: {
            ...mockPreferencesData,
            preferencesUpdatedAt: expect.any(Date),
          },
        },
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Update failed');
      mockDb.user.update.mockRejectedValue(error);

      const result = await updateUserPreferences(
        mockUser.id,
        mockPreferencesData
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to update user preferences');
    });
  });

  describe('updateUserModelData', () => {
    it('should update user model data successfully', async () => {
      const updatedUser = {
        ...mockUser,
        modelData: { ...mockUser.modelData, ...mockModelData },
      };
      mockDb.user.update.mockResolvedValue(updatedUser);

      const result = await updateUserModelData(mockUser.id, mockModelData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(updatedUser);
      expect(mockDb.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          modelData: {
            ...mockModelData,
            updatedAt: expect.any(Date),
          },
        },
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Update failed');
      mockDb.user.update.mockRejectedValue(error);

      const result = await updateUserModelData(mockUser.id, mockModelData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to update user model data');
    });
  });

  describe('updateOnboardingStatus', () => {
    it('should throw error for server-only function', async () => {
      await expect(updateOnboardingStatus()).rejects.toThrow(
        'This function should be implemented with proper auth context'
      );
    });
  });
});
