export type GetUserParams = {
  key: 'id' | 'clerkId';
  value: string;
};

export type CreateUserParams = {
  clerkId: string;
  name?: string;
  email?: string;
  image?: string;
};
