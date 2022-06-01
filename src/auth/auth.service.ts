import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, UserDto } from './dto';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const data = {
      sub: userId,
      email,
    };
    const token = await this.jwt.signAsync(data, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return { access_token: token };
  }

  async signIn(dto: AuthDto) {
    const user =
      await this.prisma.auth.findUnique({
        where: {
          email: dto.email,
        },
        select: {
          id: true,
          email: true,
          password: true,
          user: true,
          createdAt: true,
          updatedAt: true,
        },
      });

    if (!user) {
      throw new ForbiddenException(
        'Credentials taken',
      );
    }

    const matchesPassword = verify(
      user.password,
      dto.password,
    );

    if (!matchesPassword) {
      throw new ForbiddenException(
        'Credentials taken',
      );
    }

    return this.signToken(user.id, user.email);
  }

  async signUp(
    authDto: AuthDto,
    userDto: UserDto,
  ) {
    const hashPassword = await hash(
      authDto.password,
    );

    try {
      const createdUser =
        await this.prisma.user.create({
          data: {
            firstName: userDto.firstName,
            lastName: userDto.lastName,
            address: userDto.address,
            profile: userDto.profile,
          },
        });

      const createdAuth =
        await this.prisma.auth.create({
          data: {
            email: authDto.email,
            password: hashPassword,
            user: {
              connect: {
                id: createdUser.id,
              },
            },
          },
          select: {
            id: true,
            email: true,
            user: true,
            createdAt: true,
            updatedAt: true,
          },
        });
      return this.signToken(
        createdAuth.id,
        createdAuth.email,
      );
    } catch (e) {
      if (
        e instanceof PrismaClientKnownRequestError
      ) {
        if (e.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
    }
  }
}
