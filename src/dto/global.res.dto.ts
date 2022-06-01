import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class GlobalResponseDto<T> {
  @IsBoolean()
  success: boolean;
  @IsString()
  message: string;
  @IsNotEmpty()
  data: T;
}
