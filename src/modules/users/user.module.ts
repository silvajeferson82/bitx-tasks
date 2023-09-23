import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './useCases/create-user.useCase';
import { PrismaModule } from '../../infra/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [CreateUserUseCase],
  exports: [CreateUserUseCase],
})
export class UserModule {}
