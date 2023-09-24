import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskUserRequestDTO } from '../dto/task-user.dto';
import { TaskEntity } from '../entities/task-user.entity';
import { ITaskUserRepository } from '../repositories/task-user.repository';

@Injectable()
export class UpdateTaskUserUseCase {
  constructor(private taskUserRepository: ITaskUserRepository) {}

  async execute(taskId: string, data: TaskUserRequestDTO): Promise<TaskEntity> {
    const task = await this.taskUserRepository.findById({
      userId: data.userId,
      taskId,
    });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    const updatedTask = await this.taskUserRepository.update(taskId, data);

    return updatedTask;
  }
}
