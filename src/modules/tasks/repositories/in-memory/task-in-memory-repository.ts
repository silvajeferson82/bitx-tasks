import { randomUUID } from 'crypto';
import {
  TaskUserRequestDTO,
  TaskByIdRequestDTO,
} from '../../dto/task-user.dto';
import { TaskUserEntity, TaskEntity } from '../../entities/task-user.entity';
import { ITaskUserRepository } from '../task-user.repository';

export class TaskInMemoryRepository implements ITaskUserRepository {
  tasks: TaskEntity[] = [];
  tasksUser: TaskUserEntity[] = [];

  async save(data: TaskUserRequestDTO): Promise<TaskUserEntity> {
    const task: TaskEntity = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      startAt: data.startAt,
      endAt: data.endAt,
      priority: data.priority,
      status: data.status,
    };
    this.tasks.push(task);

    const taskUser: TaskUserEntity = {
      id: randomUUID(),
      userId: data.userId,
      taskId: task.id,
      createdAt: new Date(),
    };
    this.tasksUser.push(taskUser);
    return taskUser;
  }
  async findAll(userId: string): Promise<TaskEntity[]> {
    if (userId === this.tasksUser[0].userId) {
      return this.tasks;
    }
    return [];
  }
  async findById(data: TaskByIdRequestDTO): Promise<TaskEntity> {
    if (
      data.userId === this.tasksUser[0].userId &&
      data.taskId === this.tasksUser[0].taskId
    ) {
      return this.tasks[0];
    }
  }

  async update(
    taskId: string,
    data: Partial<TaskUserRequestDTO>,
  ): Promise<TaskEntity> {
    if (taskId === this.tasks[0].id) {
      this.tasks[0].title = data.title;
      this.tasks[0].description = data.description;
      this.tasks[0].startAt = data.startAt;
      this.tasks[0].endAt = data.endAt;
      this.tasks[0].priority = data.priority;
      this.tasks[0].status = data.status;
      return this.tasks[0];
    }
  }
  delete(taskId: string): Promise<TaskEntity> {
    throw new Error('Method not implemented.');
  }
}
