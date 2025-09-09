import { UserDto } from './user.dto';

export type UpdateUserDto = Partial<Omit<UserDto, 'profile'>> & {
  profile?: Partial<NonNullable<UserDto['profile']>>;
};
