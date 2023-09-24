import { Injectable } from '@nestjs/common';
import { ITaskUserRepository } from '../repositories/task-user.repository';

@Injectable()
export class FindAllTasksUserUseCase {
  constructor(private taskUserRepository: ITaskUserRepository) {}

  async execute(userId: string) {
    const tasks = await this.taskUserRepository.findAll(userId);

    return tasks;
  }
}
