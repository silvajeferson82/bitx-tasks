import { ApiProperty } from '@nestjs/swagger';
import { Task, TaskUser } from '@prisma/client';

export class TaskEntity implements Task {
  constructor(partial: Partial<TaskUserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ example: '3a1483fa-4e73-4f4c-af6d-ef6e2c77e311' })
  id: string;

  @ApiProperty({ example: 'Criar API Tarefas com NestJS' })
  title: string;

  @ApiProperty({ example: 'Deve realizar um CRUD de tarefas' })
  description: string;

  @ApiProperty({ example: '2021-06-05T18:02:43.000Z' })
  startAt: Date;

  @ApiProperty({ example: '2021-06-06T18:02:43.000Z' })
  endAt: Date;

  @ApiProperty({ example: 'BAIXA | MEDIA | ALTA' })
  priority: string;

  @ApiProperty({ example: 'PENDENTE | ANDAMENTO | CONCLUIDA' })
  status: string;
}
export class TaskUserEntity implements TaskUser {
  constructor(partial: Partial<TaskUserEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty({ example: '3a1483fa-4e73-4f4c-af6d-ef6e2c77e311' })
  id: string;

  @ApiProperty({ example: 'fdc25410-47b4-407c-aa94-1445bc5a230d' })
  taskId: string;

  @ApiProperty({ example: '3ee993da-b482-4a7b-8154-94d4d1b9b44b' })
  userId: string;

  @ApiProperty({ example: '2023-09-24T03:59:49.294Z' })
  createdAt: Date;
}
