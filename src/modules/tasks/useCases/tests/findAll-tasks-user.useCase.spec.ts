import { Test } from '@nestjs/testing';
import { FindAllTasksUserUseCase } from '../findAll-tasks-user.useCase';
import { ITaskUserRepository } from '../../repositories/task-user.repository';
import { TaskInMemoryRepository } from '../../repositories/in-memory/task-in-memory-repository';
import { randomUUID } from 'crypto';
import { CreateTaskUserUseCase } from '../create-task-user.useCase';
import { TaskUserRequestDTO } from '../../dto/task-user.dto';

describe('FindAllTaskUserUseCase', () => {
  let createTaskUserUseCase: CreateTaskUserUseCase;
  let findAllTaskUserUseCase: FindAllTasksUserUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        FindAllTasksUserUseCase,
        {
          provide: ITaskUserRepository,
          useClass: TaskInMemoryRepository,
        },
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

    findAllTaskUserUseCase = moduleRef.get<FindAllTasksUserUseCase>(
      FindAllTasksUserUseCase,
    );
  });

  it('should be able to find all tasks user', async () => {
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

    const task = await createTaskUserUseCase.execute(body);
    console.log(task);
    const result = await findAllTaskUserUseCase.execute(task.userId);

    console.log(result);
    expect(result).toHaveLength(1);
  });
});
