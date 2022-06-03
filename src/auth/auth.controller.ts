import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { GlobalResponseDto } from 'src/dto';
import { AuthService } from './auth.service';
import { AuthDto, UserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Body() req: AuthDto) {
    console.log({
      email: req.email,
      password: req.password,
    });
    return this.authService.signIn(req);
  }

  @Post('signup')
  signUp(
    @Body() req: AuthDto,
    @Body() reqUserDto: UserDto,
  ): Promise<
    GlobalResponseDto<{ access_token: string }>
  > {
    return this.authService.signUp(
      req,
      reqUserDto,
    );
  }
}
