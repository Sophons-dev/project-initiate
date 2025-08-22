// Mock API functions - replace with actual API calls
export const authApi = {
  signIn: async (data: { email: string; password: string }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock response
    return {
      user: {
        id: '1',
        email: data.email,
        name: 'John Doe',
      },
      token: 'mock-jwt-token',
    };
  },

  signUp: async (data: { fullName: string; email: string; password: string }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock response
    return {
      user: {
        id: '1',
        email: data.email,
        name: data.fullName,
      },
      token: 'mock-jwt-token',
    };
  },

  sendResetCode: async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate mock verification code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    console.log('Verification code sent to email:', code); // In real app, this would be sent via email

    return { success: true, code }; // In real app, don't return the code
  },

  verifyResetCode: async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock verification (in real app, verify against backend)
    return { success: true, resetToken: 'mock-reset-token' };
  },

  resetPassword: async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return { success: true };
  },

  signInWithGoogle: async () => {
    // Simulate Google OAuth
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      user: {
        id: 'google-1',
        email: 'user@gmail.com',
        name: 'Google User',
      },
      token: 'mock-google-jwt-token',
    };
  },
};
