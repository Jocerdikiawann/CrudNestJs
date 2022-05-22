import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Req() req: Request) {
    console.log(req);
    return this.authService.signup();
  }

  @Post('signin')
  signIn() {
    return this.authService.signin();
  }
}
