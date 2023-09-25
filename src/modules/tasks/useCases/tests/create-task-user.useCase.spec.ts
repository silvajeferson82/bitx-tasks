import { Test } from '@nestjs/testing';
import { CreateTaskUserUseCase } from '../create-task-user.useCase';
import { ITaskUserRepository } from '../../repositories/task-user.repository';
import { TaskInMemoryRepository } from '../../repositories/in-memory/task-in-memory-repository';
import { TaskUserRequestDTO } from '../../dto/task-user.dto';
import { randomUUID } from 'crypto';

describe('CreateTaskUserUseCase', () => {
  let createTaskUserUseCase: CreateTaskUserUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        CreateTaskUserUseCase,
        {
          provide: ITaskUserRepository,
          useClass: TaskInMemoryRepository,
        },
      ],
    }).compile();

    createTaskUserUseCase = moduleRef.get<CreateTaskUserUseCase>(
      CreateTaskUserUseCase,
    );
  });

  it('should be able to create a new task user', async () => {
    enum EnumPriority {
      BAIXA = 'BAIXA',
      MEDIA = 'MEDIA',
      ALTA = 'ALTA',
    }

    enum EnumStatus {
      PENDENTE = 'PENDENTE',
      ANDAMENTO = 'ANDAMENTO',
      CONCLUIDA = 'CONCLUIDA',
    }

    const body: TaskUserRequestDTO = {
      userId: randomUUID(),
      title: 'title test',
      description: 'description test',
      startAt: new Date(),
      endAt: new Date(),
      priority: EnumPriority.BAIXA,
      status: EnumStatus.PENDENTE,
    };

    const result = await createTaskUserUseCase.execute(body);
    console.log(result);
    expect(result).toHaveProperty('id');
  });
});
