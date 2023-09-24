import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { TaskUserRequestDTO } from './dto/task-user.dto';
import { CreateTaskUserUseCase } from './useCases/create-task-user.useCase';
import { AuthGuardProvider } from 'src/infra/providers/auth-guard.provider';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TaskEntity } from './entities/task-user.entity';

@Controller('/api/tasks')
@ApiTags('Tasks')
export class TaskUserController {
  constructor(private taskUserUseCase: CreateTaskUserUseCase) {}

  @UseGuards(AuthGuardProvider)
  @Post()
  @ApiOkResponse({ type: TaskEntity })
  async create(@Body() data: TaskUserRequestDTO, @Request() req) {
    console.log(data);
    console.log(req.user);
    return this.taskUserUseCase.execute({
      ...data,
      userId: req.user.id,
    });
  }
}
