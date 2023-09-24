import {
  Controller,
  Post,
  UseGuards,
  Body,
  Request,
  Get,
} from '@nestjs/common';
import { TaskUserRequestDTO } from './dto/task-user.dto';
import {
  CreateTaskUserUseCase,
  FindAllTasksUserUseCase,
} from './useCases/tasks.useCase';
import { AuthGuardProvider } from 'src/infra/providers/auth-guard.provider';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TaskUserEntity } from './entities/task-user.entity';
import { UserEntity } from '../users/entities/user.entity';

@Controller('/api/tasks')
@ApiTags('Tasks')
export class TaskUserController {
  constructor(
    private createTaskUser: CreateTaskUserUseCase,
    private findAllTasksUser: FindAllTasksUserUseCase,
  ) {}

  @UseGuards(AuthGuardProvider)
  @Post()
  @ApiOkResponse({ type: TaskUserEntity })
  async create(@Body() data: TaskUserRequestDTO, @Request() req) {
    return this.createTaskUser.execute({
      ...data,
      userId: req.user.id,
    });
  }

  @Get()
  @UseGuards(AuthGuardProvider)
  @ApiOkResponse({ type: [UserEntity] })
  async findAll(@Request() req) {
    return this.findAllTasksUser.execute(req.user.id);
  }
}
