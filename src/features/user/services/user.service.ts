import { OnboardingUserParams } from '@/features/onboarding/types/onboarding';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserDto } from '../dto/user.dto';
import { createUser } from '../actions/mutations/createUser';
import { updateUser } from '../actions/mutations/updateUser';
import { onboardUser } from '../actions/mutations/onboardUser';
import { deleteUser } from '../actions/mutations/deleteUser';

/**
 * Create a new user
 * Business logic: Validates input and orchestrates user creation
 */
export async function createUserService(userData: CreateUserDto): Promise<UserDto> {
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
export async function updateUserService(
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
export async function onboardUserService(
  clerkId: string,
  onboardingData: OnboardingUserParams
): Promise<{ userId: string; onboardingCompleted: boolean }> {
  if (!clerkId) {
    throw new Error('Clerk ID is required for onboarding');
  }

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
export async function deleteUserService(clerkId: string): Promise<void> {
  if (!clerkId) {
    throw new Error('Clerk ID is required for user deletion');
  }

  const result = await deleteUser(clerkId);

  if (!result.success) {
    throw new Error(result.error || 'Failed to delete user');
  }
}
