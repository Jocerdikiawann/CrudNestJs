import { Prisma } from '@prisma/client';
import { UserDto } from 'src/auth/dto';

export function fromUserDtoToRequestBody(
  userDto: UserDto,
): Prisma.UserCreateInput {
  return {
    firstName: userDto.firstName,
    lastName: userDto.lastName,
    address: userDto.address,
    profile: userDto.profile,
  };
}
