import { Test } from '@nestjs/testing';
import { CreateUserUseCase } from '../useCases/create-user.useCase';
import { UserController } from '../user.controller';
import { CreateUserDTO } from '../dto/create-user.dto';
import e from 'express';
import { IUserRepository } from '../repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ProfileUserUseCase } from '../useCases/profile-user.useCase';
import { randomUUID } from 'crypto';

describe('UserController', () => {
  let userController: UserController;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UserController],
      providers: [
        CreateUserUseCase,
        ProfileUserUseCase,
        {
          provide: IUserRepository,
          useValue: {
            findByUsernameOrEmail: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userRepository = moduleRef.get<IUserRepository>(IUserRepository);
  });

  it('should be able to create a new user', async () => {
    const body: CreateUserDTO = {
      email: 'email@teste.com',
      name: 'John Doe',
      username: 'johndoe',
      password: '123456',
    };

    jest.spyOn(userRepository, 'save').mockResolvedValueOnce({
      ...body,
      id: randomUUID(),
      createdAt: new Date(),
    });

    const result = await userController.create(body);

    console.log(result);
    expect(result).toHaveProperty('id');
  });
});
