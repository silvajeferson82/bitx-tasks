import { Module } from '@nestjs/common';
import { TaskUserController } from './task-user.controller';
import { PrismaService } from '../../infra/database/prisma.service';
import {
  CreateTaskUserUseCase,
  FindAllTasksUserUseCase,
  FindByIdTasksUserUseCase,
  UpdateTaskUserUseCase,
} from './useCases/tasks.useCase';
import { ITaskUserRepository } from './repositories/task-user.repository';
import { TaskUserPrismaRepository } from './repositories/prisma/task-user.prisma.repository';

@Module({
  imports: [],
  controllers: [TaskUserController],
  providers: [
    PrismaService,
    CreateTaskUserUseCase,
    FindAllTasksUserUseCase,
    FindByIdTasksUserUseCase,
    UpdateTaskUserUseCase,
    {
      provide: ITaskUserRepository,
      useClass: TaskUserPrismaRepository,
    },
  ],
  exports: [
    CreateTaskUserUseCase,
    FindAllTasksUserUseCase,
    FindByIdTasksUserUseCase,
    UpdateTaskUserUseCase,
  ],
})
export class TaskUserModule {}
