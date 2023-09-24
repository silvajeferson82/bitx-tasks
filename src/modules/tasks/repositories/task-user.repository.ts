import { TaskByIdRequestDTO, TaskUserRequestDTO } from '../dto/task-user.dto';
import { TaskUserEntity, TaskEntity } from '../entities/task-user.entity';

export abstract class ITaskUserRepository {
  abstract save(data: TaskUserRequestDTO): Promise<TaskUserEntity>;
  abstract findAll(userId: string): Promise<TaskEntity[]>;
  abstract findById(data: TaskByIdRequestDTO): Promise<TaskEntity>;
  abstract update(
    id: string,
    data: Partial<TaskUserRequestDTO>,
  ): Promise<TaskEntity>;
  abstract delete(id: string): Promise<TaskEntity>;
}
