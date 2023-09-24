import { Injectable } from '@nestjs/common';
import { ITaskUserRepository } from '../task-user.repository';
import {
  TaskByIdRequestDTO,
  TaskUserRequestDTO,
} from '../../dto/task-user.dto';
import { TaskEntity, TaskUserEntity } from '../../entities/task-user.entity';
import { PrismaService } from '../../../../infra/database/prisma.service';

@Injectable()
export class TaskUserPrismaRepository implements ITaskUserRepository {
  constructor(private prisma: PrismaService) {}

  save(data: TaskUserRequestDTO): Promise<TaskUserEntity> {
    return this.prisma.taskUser.create({
      data: {
        task: {
          create: {
            title: data.title,
            description: data.description,
            startAt: data.startAt,
            endAt: data.endAt,
            priority: data.priority,
            status: data.status,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
  }

  findAll(userId: string): Promise<TaskEntity[]> {
    return this.prisma.task.findMany({
      where: {
        TaskUser: {
          some: {
            userId,
          },
        },
      },
    });
  }

  findById(data: TaskByIdRequestDTO): Promise<TaskEntity> {
    return this.prisma.task.findFirst({
      where: {
        id: data.taskId,
        TaskUser: {
          some: {
            userId: data.userId,
          },
        },
      },
    });
  }

  update(id: string, data: Partial<TaskUserRequestDTO>): Promise<TaskEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<TaskEntity> {
    throw new Error('Method not implemented.');
  }
}
