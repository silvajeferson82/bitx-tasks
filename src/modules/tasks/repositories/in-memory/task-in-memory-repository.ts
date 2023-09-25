import { randomUUID } from 'crypto';
import {
  TaskUserRequestDTO,
  TaskByIdRequestDTO,
} from '../../dto/task-user.dto';
import { TaskUserEntity, TaskEntity } from '../../entities/task-user.entity';
import { ITaskUserRepository } from '../task-user.repository';

export class TaskInMemoryRepository implements ITaskUserRepository {
  tasks: TaskEntity[] = [];

  async save(data: TaskUserRequestDTO): Promise<TaskUserEntity> {
    const task: TaskUserEntity = {
      id: randomUUID(),
      userId: data.userId,
      taskId: randomUUID(),
      createdAt: new Date(),
    };

    return task;
  }
  findAll(userId: string): Promise<TaskEntity[]> {
    throw new Error('Method not implemented.');
  }
  findById(data: TaskByIdRequestDTO): Promise<TaskEntity> {
    throw new Error('Method not implemented.');
  }
  update(
    taskId: string,
    data: Partial<TaskUserRequestDTO>,
  ): Promise<TaskEntity> {
    throw new Error('Method not implemented.');
  }
  delete(taskId: string): Promise<TaskEntity> {
    throw new Error('Method not implemented.');
  }
}
