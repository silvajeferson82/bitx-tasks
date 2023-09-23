import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ISignInRepository } from '../repositories/sign-in.repository';
import { SignInDTO } from '../dto/sign-in.dto';
import { compare } from 'bcrypt';

@Injectable()
export class SignInUseCase {
  constructor(
    private jwtService: JwtService,
    private signInRepository: ISignInRepository,
  ) {}

  async execute(data: SignInDTO) {
    const user = await this.signInRepository.findByUsername(data.username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatch = await compare(data.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      accessToken: token,
    };
  }
}
