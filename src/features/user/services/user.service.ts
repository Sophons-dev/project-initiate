import { OnboardingUserParams } from '@/features/onboarding/types/onboarding';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserDto } from '../dto/user.dto';
import { createUser } from '../actions/mutations/createUser';
import { updateUser } from '../actions/mutations/updateUser';
import { onboardUser } from '../actions/mutations/onboardUser';
import { deleteUser } from '../actions/mutations/deleteUser';

export class UserService {
  /**
   * Create a new user
   * Business logic: Validates input and orchestrates user creation
   */
  static async createUser(userData: CreateUserDto): Promise<UserDto> {
    // Business logic validation
    if (!userData.email || !userData.clerkId || !userData.profile?.name) {
      throw new Error('Missing required fields');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error('Invalid email format');
    }

    // Orchestrate the creation through action
    const result = await createUser(userData);

    if (!result.success) {
      throw new Error(result.error || 'Failed to create user');
    }

    return result.data!;
  }

  /**
   * Update user
   * Business logic: Validates input and orchestrates user updates
   */
  static async updateUser(
    identifier: { key: 'id' | 'clerkId'; value: string },
    updates: UpdateUserDto
  ): Promise<UserDto> {
    // Business logic validation
    if (!identifier.value || !identifier.key) {
      throw new Error('Invalid identifier provided');
    }

    // Validate email format if email is being updated
    if (updates.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updates.email)) {
        throw new Error('Invalid email format');
      }
    }

    // Orchestrate the update through action
    const result = await updateUser(identifier, updates);

    if (!result.success) {
      throw new Error(result.error || 'Failed to update user');
    }

    return result.data!;
  }

  /**
   * Onboard user
   * Business logic: Validates onboarding data and orchestrates the onboarding process
   */
  static async onboardUser(
    clerkId: string,
    onboardingData: OnboardingUserParams
  ): Promise<{ userId: string; onboardingCompleted: boolean }> {
    // Business logic validation
    if (!clerkId) {
      throw new Error('Clerk ID is required for onboarding');
    }

    if (!onboardingData.fullName || !onboardingData.userType) {
      throw new Error('Full name and user type are required for onboarding');
    }

    // Validate date of birth
    const dateOfBirth = new Date(onboardingData.dateOfBirth);
    if (isNaN(dateOfBirth.getTime())) {
      throw new Error('Invalid date of birth provided');
    }

    // Validate that user is not already onboarded (business rule)
    // This could be enhanced with a check to see if user is already onboarded

    // Orchestrate the onboarding through action
    const result = await onboardUser(onboardingData);

    if (!result.success) {
      throw new Error(result.error || 'Failed to complete onboarding');
    }

    return result.data!;
  }

  /**
   * Delete user
   * Business logic: Validates deletion request and orchestrates user deletion
   */
  static async deleteUser(clerkId: string): Promise<void> {
    // Business logic validation
    if (!clerkId) {
      throw new Error('Clerk ID is required for user deletion');
    }

    // Business rule: Could add additional checks here like:
    // - Check if user has active subscriptions
    // - Check if user has pending transactions
    // - Require admin approval for certain user types
    // - Add audit logging

    // Orchestrate the deletion through action
    const result = await deleteUser(clerkId);

    if (!result.success) {
      throw new Error(result.error || 'Failed to delete user');
    }
  }
}
