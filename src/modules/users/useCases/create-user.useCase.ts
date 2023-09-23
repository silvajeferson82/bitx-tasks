import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from '../../../infra/database/prisma.service';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreateUserDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            username: data.username,
          },
          {
            email: data.email,
          },
        ],
      },
    });

    if (user) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(data.password, 10);

    return await this.prisma.user.create({
      data: {
        ...data,
        password: passwordHash,
      },
    });
  }
}
