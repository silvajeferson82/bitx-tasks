import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './useCases/create-user.useCase';
import { PrismaModule } from '../../infra/prisma.module';
import { PrismaService } from '../../infra/database/prisma.service';
import { UserPrismaRepository } from './repositories/prisma/user.prisma.repository';
import { IUserRepository } from './repositories/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [CreateUserUseCase],
})
export class UserModule {}
