import { Test } from '@nestjs/testing';
import { CreateUserUseCase } from '../create-user.useCase';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { IUserRepository } from '../../repositories/user.repository';
import { UserInMemoryRepository } from '../../repositories/in-memory/user-in-memory-repository';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: IUserRepository,
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be able to create a new user', async () => {
    const data: CreateUserDTO = {
      name: 'John Doe',
      email: 'email@teste.com',
      username: 'johndoe',
      password: '123456',
    };

    const result = await createUserUseCase.execute(data);

    expect(result).toHaveProperty('id');
  });

  it('should not be able to create a new user with an existing username', async () => {
    const data: CreateUserDTO = {
      name: 'John Doe',
      email: 'alread_exists@teste.com',
      username: 'alread_exists',
      password: '123456',
    };

    await createUserUseCase.execute(data);

    expect(createUserUseCase.execute(data)).rejects.toThrowError();
  });
});
