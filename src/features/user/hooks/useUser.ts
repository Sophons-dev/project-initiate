import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, updateUser, deleteUser, onboardUser, getUserById } from '../actions';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { OnboardingUserParams } from '@/features/onboarding/types/onboarding';
import { getUserByClerkId } from '../actions/queries/getUserByClerkId';

// Get user by mongo ID
export function useGetUserById(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
}

// Get user by Clerk ID
export function useGetUserByClerkId(clerkId: string) {
  return useQuery({
    queryKey: ['user', clerkId],
    queryFn: () => getUserByClerkId(clerkId),
    enabled: !!clerkId,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateUserDto) => createUser(userData),
    onSuccess: data => {
      if (data.success && data.data) {
        queryClient.setQueryData(['user', 'clerkId', data.data.clerkId], data);
        queryClient.setQueryData(['user', 'id', data.data.id], data);
      }
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      identifier,
      updates,
    }: {
      identifier: { key: 'id' | 'clerkId'; value: string };
      updates: UpdateUserDto;
    }) => updateUser(identifier, updates),
    onSuccess: (data, variables) => {
      if (data.success && data.data) {
        queryClient.setQueryData(['user', variables.identifier.key, variables.identifier.value], data);
        queryClient.setQueryData(['user', 'clerkId', data.data.clerkId], data);
        queryClient.setQueryData(['user', 'id', data.data.id], data);
      }
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clerkId: string) => deleteUser(clerkId),
    onSuccess: (_, clerkId) => {
      queryClient.removeQueries({ queryKey: ['user', 'clerkId', clerkId] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useOnboardUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (onboardingData: OnboardingUserParams) => onboardUser(onboardingData),
    onSuccess: data => {
      if (data.success && data.data) {
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
  });
}
