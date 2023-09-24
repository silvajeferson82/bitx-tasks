import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateUserDTO, UserNameAndEmailDTO } from '../../dto/create-user.dto';
import { IUserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByUsernameOrEmail(data: UserNameAndEmailDTO) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });
  }

  async save(user: CreateUserDTO) {
    return await this.prisma.user.create({
      data: user,
    });
  }

  async findByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }
}
