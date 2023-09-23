import { CreateUserDTO } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class IUserRepository {
  abstract save(data: CreateUserDTO): Promise<UserEntity>;
  abstract findByUsernameOrEmail(
    username: string,
    email: string,
  ): Promise<UserEntity | null>;
  abstract findByUsername(username: string): Promise<UserEntity | null>;
  abstract findById(id: string): Promise<UserEntity | null>;
}
