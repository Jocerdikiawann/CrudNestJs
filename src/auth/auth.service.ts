import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    return {
      success: true,
      message: 'ok',
      data: {
        where: 'signin',
      },
    };
  }

  signup() {
    return {
      success: true,
      message: 'ok',
      data: {
        where: 'signup',
      },
    };
  }
}
