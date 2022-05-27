import {IsNotEmpty, IsString} from "class-validator";

export class UserDto {


  @IsString()
  @IsNotEmpty()
  authId: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsString()
  @IsNotEmpty()
  address: string

  @IsString()
  @IsNotEmpty()
  profile: string

}
