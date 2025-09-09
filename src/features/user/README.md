# User Data Caching with TanStack Query

This guide shows how to efficiently reuse user data across your application using TanStack Query's caching capabilities.

## 🚀 Quick Start

### 1. Basic Usage

```tsx
import { useCurrentUser } from '@/features/user/hooks';

function MyComponent() {
  const { data, isLoading, error } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const user = data?.success ? data.data : null;

  return (
    <div>
      <h1>Welcome, {user?.profile?.name}!</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
}
```

### 2. Using the User Context (Recommended)

For components that need user data throughout the app, use the context:

```tsx
// In your layout or app root
import { UserProvider } from '@/features/user/contexts';

function AppLayout({ children }) {
  return <UserProvider>{children}</UserProvider>;
}

// In any component
import { useUser, useIsAuthenticated } from '@/features/user/contexts';

function Navbar() {
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();

  return <nav>{isAuthenticated ? <span>Hello, {user?.profile?.name}!</span> : <a href='/sign-in'>Sign In</a>}</nav>;
}
```

## 🎯 Key Benefits

### 1. **Automatic Caching**

- User data is cached for 5 minutes (staleTime)
- Cache persists for 10 minutes (gcTime)
- No unnecessary refetches when navigating between pages

### 2. **Consistent Query Keys**

```tsx
// All these queries share the same cache:
useUserByClerkId('user_123'); // ['user', 'clerkId', 'user_123']
useCurrentUser(); // Same as above when userId is 'user_123'
```

### 3. **Smart Cache Updates**

When you update user data, all related queries are automatically updated:

```tsx
const updateUser = useUpdateUser();

const handleUpdateProfile = async () => {
  await updateUser.mutateAsync({
    identifier: { key: 'clerkId', value: 'user_123' },
    updates: { profile: { name: 'New Name' } },
  });
  // All components using this user data will automatically update!
};
```

## 📱 Real-World Examples

### Example 1: Dashboard Page

```tsx
import { useCurrentUser } from '@/features/user/hooks';

function Dashboard() {
  const { data, isLoading } = useCurrentUser();
  const user = data?.success ? data.data : null;

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div>
      <h1>Dashboard</h1>
      <UserProfile user={user} />
      <UserStats user={user} />
    </div>
  );
}
```

### Example 2: Profile Page (Reuses cached data!)

```tsx
import { useCurrentUser } from '@/features/user/hooks';

function ProfilePage() {
  const { data, isLoading } = useCurrentUser();
  const user = data?.success ? data.data : null;

  // This will use cached data if user was already fetched on dashboard!
  if (isLoading) return <ProfileSkeleton />;

  return (
    <div>
      <h1>Profile</h1>
      <ProfileForm user={user} />
    </div>
  );
}
```

### Example 3: Navigation with Prefetching

```tsx
import { useUserPrefetch } from '@/features/user/hooks';

function Navigation() {
  const { navigateWithUserPrefetch } = useUserPrefetch();
  const { userId } = useAuth();

  const handleNavigateToProfile = () => {
    // Prefetch user data before navigation
    navigateWithUserPrefetch('/profile', userId);
  };

  return (
    <nav>
      <button onClick={handleNavigateToProfile}>Go to Profile</button>
    </nav>
  );
}
```

## 🔧 Advanced Usage

### Manual Cache Management

```tsx
import { useQueryClient } from '@tanstack/react-query';
import { userQueryKeys } from '@/features/user/hooks';

function AdminPanel() {
  const queryClient = useQueryClient();

  const refreshUserData = (clerkId: string) => {
    // Force refetch user data
    queryClient.invalidateQueries({
      queryKey: userQueryKeys.byClerkId(clerkId),
    });
  };

  const clearUserCache = (clerkId: string) => {
    // Remove user from cache
    queryClient.removeQueries({
      queryKey: userQueryKeys.byClerkId(clerkId),
    });
  };

  return (
    <div>
      <button onClick={() => refreshUserData('user_123')}>Refresh User Data</button>
      <button onClick={() => clearUserCache('user_123')}>Clear Cache</button>
    </div>
  );
}
```

### Optimistic Updates

```tsx
import { useUpdateUser } from '@/features/user/hooks';

function ProfileForm() {
  const updateUser = useUpdateUser();
  const { userId } = useAuth();

  const handleSubmit = async formData => {
    // Optimistic update
    updateUser.mutate(
      {
        identifier: { key: 'clerkId', value: userId },
        updates: { profile: formData },
      },
      {
        onError: error => {
          // Rollback on error
          console.error('Update failed:', error);
        },
      }
    );
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}
```

## 🎨 Best Practices

1. **Use `useCurrentUser()` for most cases** - It automatically gets the current authenticated user
2. **Use the User Context** for components that need user data throughout the app
3. **Prefetch data** when you know users will navigate to pages that need it
4. **Don't over-fetch** - The cache handles most of your needs automatically
5. **Use optimistic updates** for better UX when updating user data

## 🚨 Common Pitfalls

1. **Don't create multiple query keys for the same data**
2. **Don't forget to handle loading and error states**
3. **Don't manually manage cache unless necessary** - TanStack Query handles most cases
4. **Don't use the context for one-off data fetching** - Use hooks directly instead

## 📊 Performance Benefits

- **Reduced API calls**: Data is cached and reused across components
- **Faster navigation**: No loading states when data is already cached
- **Better UX**: Optimistic updates and smart cache invalidation
- **Automatic background updates**: Data stays fresh without user intervention
