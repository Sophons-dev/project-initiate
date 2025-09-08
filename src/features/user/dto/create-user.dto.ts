import { UserDto } from './user.dto';

export type CreateUserDto = Required<Pick<UserDto, 'clerkId' | 'email'>> & {
  profile?: Pick<NonNullable<UserDto['profile']>, 'name' | 'image'>;
};
