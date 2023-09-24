import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ITaskUserRepository } from '../repositories/task-user.repository';
import { TaskByIdRequestDTO } from '../dto/task-user.dto';

@Injectable()
export class DeleteTaskUserUseCase {
  constructor(private taskUserRepository: ITaskUserRepository) {}

  async execute(data: TaskByIdRequestDTO) {
    const task = await this.taskUserRepository.findById({
      userId: data.userId,
      taskId: data.taskId,
    });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return await this.taskUserRepository.delete(data.taskId);
  }
}
