import { Injectable } from '@nestjs/common';
import { ISignInRepository } from '../sign-in.repository';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { PrismaService } from '../../../../infra/database/prisma.service';

@Injectable()
export class SignInPrismaRepository implements ISignInRepository {
  constructor(private prisma: PrismaService) {}

  async findByUsername(username: string): Promise<UserEntity> {
    return await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }
}
