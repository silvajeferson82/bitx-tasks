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
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuardProvider } from '../../infra/providers/auth-guard.provider';
import { ProfileUserUseCase } from './useCases/profile-user.useCase';

@Controller('/api')
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
  ) {}

  @Post('/users')
  @ApiBody({
    description: 'Criação de usuário',
    type: CreateUserDTO,
  })
  @ApiResponse({ status: 201, type: UserEntity })
  @ApiResponse({ status: 400, description: 'User already exists' })
  async create(@Body() data: CreateUserDTO) {
    try {
      const user = await this.createUserUseCase.execute(data);

      return new UserEntity(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/users/profile')
  @ApiResponse({ status: 200, type: UserEntity })
  @UseGuards(AuthGuardProvider)
  @ApiBearerAuth()
  async profile(@Request() req) {
    return this.profileUserUseCase.execute(req.user.id);
  }
}
