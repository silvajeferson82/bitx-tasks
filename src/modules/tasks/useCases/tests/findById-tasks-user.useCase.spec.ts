import { Test } from '@nestjs/testing';
import { ITaskUserRepository } from '../../repositories/task-user.repository';
import { TaskInMemoryRepository } from '../../repositories/in-memory/task-in-memory-repository';
import { randomUUID } from 'crypto';
import { CreateTaskUserUseCase } from '../create-task-user.useCase';
import { TaskUserRequestDTO } from '../../dto/task-user.dto';
import { FindByIdTasksUserUseCase } from '../findById-tasks-user.useCase';

describe('Find by id task user', () => {
  let createTaskUserUseCase: CreateTaskUserUseCase;
  let findByidTaskUserUseCase: FindByIdTasksUserUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        FindByIdTasksUserUseCase,
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

    findByidTaskUserUseCase = moduleRef.get<FindByIdTasksUserUseCase>(
      FindByIdTasksUserUseCase,
    );
  });

  it('should be able to find task user by id', async () => {
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
    const result = await findByidTaskUserUseCase.execute({
      userId: task.userId,
      taskId: task.taskId,
    });

    expect(result).toHaveProperty('id');
  });
});
