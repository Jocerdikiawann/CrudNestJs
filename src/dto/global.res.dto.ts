import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class GlobalResponseDto<T> {
  @IsNumber()
  statusCode: number;
  @IsString()
  message: string;
  @IsNotEmpty()
  data: T;
}
