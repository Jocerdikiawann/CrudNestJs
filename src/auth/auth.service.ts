import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService){}
  
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
