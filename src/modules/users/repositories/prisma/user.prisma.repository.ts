import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { IUserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByUsernameOrEmail(username: string, email: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
  }

  async save(user: CreateUserDTO) {
    return await this.prisma.user.create({
      data: user,
    });
  }
}
