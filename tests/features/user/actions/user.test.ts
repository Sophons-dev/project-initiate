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
} from '@/features/user/actions/user';

describe('User Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const expectedUser = {
        ...mockUser,
        profile: {},
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

      const result = await createUser(mockUserInput);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(expectedUser);
      expect(mockDb.user.create).toHaveBeenCalledWith({
        data: {
          ...mockUserInput,
          profile: {},
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
      const error = new Error('Database connection failed');
      mockDb.user.create.mockRejectedValue(error);

      const result = await createUser(mockUserInput);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to create user');
    });
  });

  describe('updateUserProfile', () => {
    it('should update user profile successfully', async () => {
      const updatedUser = { ...mockUser, ...mockProfileData };
      mockDb.user.update.mockResolvedValue(updatedUser);

      const result = await updateUserProfile(mockUser.id, mockProfileData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(updatedUser);
      expect(mockDb.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          profile: {
            fullName: mockProfileData.fullName,
            avatarUrl: mockProfileData.avatarUrl,
            bio: mockProfileData.bio,
            location: mockProfileData.location,
            organization: mockProfileData.organization,
            website: mockProfileData.website,
          },
          preferences: {
            interests: mockProfileData.interests,
            goals: mockProfileData.goals,
            preferredOpportunityTypes:
              mockProfileData.preferredOpportunityTypes,
            skills: mockProfileData.skills,
            preferencesUpdatedAt: expect.any(Date),
          },
        },
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Update failed');
      mockDb.user.update.mockRejectedValue(error);

      const result = await updateUserProfile(mockUser.id, mockProfileData);

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
          role: true,
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

  describe('updateUser', () => {
    it('should update user basic fields successfully', async () => {
      const updateData = { name: 'Jane Doe', email: 'jane@example.com' };
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
        fullName: 'Jane Doe',
        bio: 'Software Engineer',
        location: 'New York',
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
            fullName: 'Jane Doe',
            bio: 'Software Engineer',
            location: 'New York',
            avatarUrl: undefined,
            organization: undefined,
            website: undefined,
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
            onboardingCompleted: undefined,
            preferencesUpdatedAt: expect.any(Date),
          },
        },
      });
    });

    it('should update mixed fields successfully', async () => {
      const updateData = {
        name: 'Jane Doe',
        fullName: 'Jane Doe',
        interests: ['AI'],
      };
      const updatedUser = {
        ...mockUser,
        name: 'Jane Doe',
        profile: { ...mockUser.profile, fullName: 'Jane Doe' },
        preferences: {
          ...mockUser.preferences,
          interests: ['AI'],
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
          name: 'Jane Doe',
          profile: {
            fullName: 'Jane Doe',
            avatarUrl: undefined,
            bio: undefined,
            location: undefined,
            organization: undefined,
            website: undefined,
          },
          preferences: {
            interests: ['AI'],
            goals: undefined,
            preferredOpportunityTypes: undefined,
            skills: undefined,
            onboardingCompleted: undefined,
            preferencesUpdatedAt: expect.any(Date),
          },
        },
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Update failed');
      mockDb.user.update.mockRejectedValue(error);

      const result = await updateUser(mockUser.id, { name: 'Jane Doe' });

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

  describe('updateOnboardingStatus', () => {
    it('should update onboarding status successfully', async () => {
      const updatedUser = {
        ...mockUser,
        preferences: { ...mockUser.preferences, onboardingCompleted: true },
      };
      mockDb.user.update.mockResolvedValue(updatedUser);

      const result = await updateOnboardingStatus(mockUser.id, true);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(updatedUser);
      expect(mockDb.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          preferences: {
            onboardingCompleted: true,
            preferencesUpdatedAt: expect.any(Date),
          },
        },
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Update failed');
      mockDb.user.update.mockRejectedValue(error);

      const result = await updateOnboardingStatus(mockUser.id, true);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to update onboarding status');
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
});
