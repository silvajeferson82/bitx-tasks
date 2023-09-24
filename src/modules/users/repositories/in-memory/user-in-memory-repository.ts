import { randomUUID } from 'crypto';
import { CreateUserDTO, UserNameAndEmailDTO } from '../../dto/create-user.dto';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from '../user.repository';

export class UserInMemoryRepository implements IUserRepository {
  users: UserEntity[] = [];

  async save(data: CreateUserDTO): Promise<UserEntity> {
    const user: UserEntity = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
    };

    return user;
  }

  async findByUsernameOrEmail(
    data: UserNameAndEmailDTO,
  ): Promise<UserEntity | null> {
    const findUser = this.users.find(
      (user) => user.username === data.username || user.email === data.email,
    );
    return findUser ?? null;
  }
  // findByUsername(username: string): Promise<UserEntity> {
  //   throw new Error('Method not implemented.');
  // }
  findById(id: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
}
