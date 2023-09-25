import { Test } from '@nestjs/testing';
import { ITaskUserRepository } from '../../repositories/task-user.repository';
import { TaskInMemoryRepository } from '../../repositories/in-memory/task-in-memory-repository';
import { randomUUID } from 'crypto';
import { CreateTaskUserUseCase } from '../create-task-user.useCase';
import { TaskUserRequestDTO } from '../../dto/task-user.dto';
import { FindByIdTasksUserUseCase } from '../findById-tasks-user.useCase';
import { DeleteTaskUserUseCase } from '../delete-task-user.useCase';
import exp from 'constants';

describe('Delete Task User', () => {
  let createTaskUserUseCase: CreateTaskUserUseCase;
  let findByidTaskUserUseCase: FindByIdTasksUserUseCase;
  let deleteTaskUserUseCase: DeleteTaskUserUseCase;

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
        DeleteTaskUserUseCase,
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

    deleteTaskUserUseCase = moduleRef.get<DeleteTaskUserUseCase>(
      DeleteTaskUserUseCase,
    );
  });

  it('should be able deletetask user', async () => {
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
    const findTask = await findByidTaskUserUseCase.execute({
      userId: task.userId,
      taskId: task.taskId,
    });

    const result = await deleteTaskUserUseCase.execute({
      userId: task.userId,
      taskId: task.taskId,
    });

    expect(result).toHaveProperty('id');
  });
});
