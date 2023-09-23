import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateUserUseCase } from './useCases/create-user.useCase';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('/api/users')
@ApiTags('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() data: CreateUserDTO) {
    try {
      const user = await this.createUserUseCase.execute(data);

      return new UserEntity(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
