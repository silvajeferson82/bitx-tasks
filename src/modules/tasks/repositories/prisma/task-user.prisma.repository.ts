import { Injectable } from '@nestjs/common';
import { ITaskUserRepository } from '../task-user.repository';
import { TaskUserRequestDTO } from '../../dto/task-user.dto';
import { TaskUserEntity } from '../../entities/task-user.entity';
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
  findAll(): Promise<TaskUserEntity[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<TaskUserEntity> {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    data: Partial<TaskUserRequestDTO>,
  ): Promise<TaskUserEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<TaskUserEntity> {
    throw new Error('Method not implemented.');
  }
}
