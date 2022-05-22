import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { env } from 'process';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasource: {
        db: {
          url: env.DATABASE_URL,
        },
      },
    });
  }
}
