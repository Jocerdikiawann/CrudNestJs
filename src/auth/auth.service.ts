import { Injectable } from '@nestjs/common';
import {hash} from 'argon2';
import {env} from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import {AuthDto, UserDto} from './dto';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService){}

  async signin(authDto: AuthDto,userDto: UserDto) {
    console.log(env.DATABASE_URL)
    const hashPassword =await hash(authDto.password)
    const createdAuth = await this.prisma.auth.create({
      data:{
        email: authDto.email,
        password: hashPassword
      }
    })
    const user = await this.prisma.user.create({
      data:{
        authId: createdAuth.id,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        address: userDto.address,
        profile: userDto.profile
      }
    }) 
    return user 
  }

  signup(dto: AuthDto) {
    return {
      success: true,
      message: 'ok',
      data: {
        where: 'signup',
      },
    };
  }
}
