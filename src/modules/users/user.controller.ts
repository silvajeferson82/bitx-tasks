import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateUserUseCase } from './useCases/create-user.useCase';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuardProvider } from '../../infra/providers/auth-guard.provider';
import { ProfileUserUseCase } from './useCases/profile-user.useCase';

@Controller('/api')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
  ) {}

  @Post('/users')
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() data: CreateUserDTO) {
    try {
      const user = await this.createUserUseCase.execute(data);

      return new UserEntity(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/users/profile')
  @UseGuards(AuthGuardProvider)
  async profile(@Request() req) {
    return this.profileUserUseCase.execute(req.user.id);
  }
}
