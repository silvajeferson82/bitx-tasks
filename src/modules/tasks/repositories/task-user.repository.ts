import { TaskUserRequestDTO } from '../dto/task-user.dto';
import { TaskUserEntity } from '../entities/task-user.entity';

export abstract class ITaskUserRepository {
  abstract save(data: TaskUserRequestDTO): Promise<TaskUserEntity>;
  abstract findAll(): Promise<TaskUserEntity[]>;
  abstract findById(id: string): Promise<TaskUserEntity>;
  abstract update(
    id: string,
    data: Partial<TaskUserRequestDTO>,
  ): Promise<TaskUserEntity>;
  abstract delete(id: string): Promise<TaskUserEntity>;
}
