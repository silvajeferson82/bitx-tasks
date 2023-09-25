import { Test } from '@nestjs/testing';
import { ITaskUserRepository } from '../../repositories/task-user.repository';
import { TaskInMemoryRepository } from '../../repositories/in-memory/task-in-memory-repository';
import { randomUUID } from 'crypto';
import { CreateTaskUserUseCase } from '../create-task-user.useCase';
import { TaskUserRequestDTO } from '../../dto/task-user.dto';
import { FindByIdTasksUserUseCase } from '../findById-tasks-user.useCase';
import { UpdateTaskUserUseCase } from '../update-task-user.usecase';

describe('Update task user', () => {
  let createTaskUserUseCase: CreateTaskUserUseCase;
  let findByidTaskUserUseCase: FindByIdTasksUserUseCase;
  let updateTaskUserUseCase: UpdateTaskUserUseCase;

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
        UpdateTaskUserUseCase,
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

    updateTaskUserUseCase = moduleRef.get<UpdateTaskUserUseCase>(
      UpdateTaskUserUseCase,
    );
  });

  it('should be able update task user', async () => {
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

    const updateTask: TaskUserRequestDTO = {
      userId: task.userId,
      title: 'title test update',
      description: 'description test update',
      startAt: new Date(),
      endAt: new Date(),
      priority: EnumPriority.MEDIA,
      status: EnumStatus.ANDAMENTO,
    };

    const result = await updateTaskUserUseCase.execute(findTask.id, updateTask);
    expect(result.title).toEqual('title test update');
  });
});
