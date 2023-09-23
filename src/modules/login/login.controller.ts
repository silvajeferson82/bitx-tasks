import { Body, Controller, Post } from '@nestjs/common';
import { SignInUseCase } from './usecases/sign-in.useCase';
import { SignInDTO } from './dto/sign-in.dto';

@Controller('/api/auth')
export class LoginController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('/signin')
  async signIn(@Body() signInDTO: SignInDTO) {
    const token = await this.signInUseCase.execute(signInDTO);
    return token;
  }
}
