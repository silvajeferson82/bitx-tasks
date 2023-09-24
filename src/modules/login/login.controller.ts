import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInUseCase } from './usecases/sign-in.useCase';
import { SignInDTO } from './dto/sign-in.dto';
import { SignInEntity } from './entities/sign-in.entity';

@Controller('/api/auth')
@ApiTags('Auth')
export class LoginController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('/signin')
  @ApiBody({
    description: 'Autenticação de usuário',
    type: SignInDTO,
  })
  @ApiOkResponse({
    status: 200,
    description: 'Token de autenticação',
    type: SignInEntity,
  })
  @ApiOkResponse({
    status: 401,
    description: 'Credenciais inválidas',
  })
  async signIn(@Body() signInDTO: SignInDTO) {
    const token = await this.signInUseCase.execute(signInDTO);
    return token;
  }
}
