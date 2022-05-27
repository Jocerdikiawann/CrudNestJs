import { Injectable } from '@nestjs/common';
import {hash} from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import {AuthDto, UserDto} from './dto';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService){}
  
  async signin(authDto: AuthDto,userDto: UserDto) {
    const hashPassword =await hash(dto.password)
    const createdAuth = await this.prisma.auth.create({
      data:{
        email: dto.email,
        password: hashPassword
      }
    })
    const user = await this.prisma.user.create({
      data:{
        auth: {
          connect: { 
            id: createdAuth.id
          }
        },
        authId: createdAuth.id,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        address: userDto.address,
        profile: userDto.profile
      }
    }) 
    return {
      success: true,
      message: 'ok',
      data: {
        where: 'signin',
      },
    };
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
