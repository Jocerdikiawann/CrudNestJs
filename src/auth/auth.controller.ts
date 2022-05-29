import { Body,Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthDto, UserDto} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() req: AuthDto) {
    console.log({
      email: req.email,
      password: req.password
    });
    return this.authService.signup(req);
  }

  @Post('signin')
  signIn(@Body() req: AuthDto, reqUserDto: UserDto) {
    return this.authService.signin(req, reqUserDto);
  }
}
