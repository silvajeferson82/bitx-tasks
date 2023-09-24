import {
  Controller,
  Post,
  UseGuards,
  Body,
  Request,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { TaskByIdRequestDTO, TaskUserRequestDTO } from './dto/task-user.dto';
import {
  CreateTaskUserUseCase,
  FindAllTasksUserUseCase,
  FindByIdTasksUserUseCase,
} from './useCases/tasks.useCase';
import { AuthGuardProvider } from 'src/infra/providers/auth-guard.provider';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TaskEntity, TaskUserEntity } from './entities/task-user.entity';

@Controller('/api/tasks')
@ApiTags('Tasks')
export class TaskUserController {
  constructor(
    private createTaskUser: CreateTaskUserUseCase,
    private findAllTasksUser: FindAllTasksUserUseCase,
    private findByTaskId: FindByIdTasksUserUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuardProvider)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TaskUserEntity })
  async create(@Body() data: TaskUserRequestDTO, @Request() req) {
    return this.createTaskUser.execute({
      ...data,
      userId: req.user.id,
    });
  }

  @Get()
  @UseGuards(AuthGuardProvider)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [TaskEntity] })
  async findAll(@Request() req) {
    return this.findAllTasksUser.execute(req.user.id);
  }

  @Get('/:taskId')
  @UseGuards(AuthGuardProvider)
  @ApiOkResponse({ type: TaskEntity })
  async findById(@Param() data: TaskByIdRequestDTO, @Request() req) {
    return await this.findByTaskId.execute({
      userId: req.user.id,
      taskId: data.taskId,
    });
  }
}
