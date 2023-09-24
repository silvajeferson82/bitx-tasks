import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infra/prisma.module';
import { LoginController } from './login.controller';
import { SignInUseCase } from './usecases/sign-in.useCase';
import { PrismaService } from '../../infra/database/prisma.service';
import { ISignInRepository } from './repositories/sign-in.repository';
import { SignInPrismaRepository } from './repositories/prisma/sign-in.prisma.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [LoginController],
  providers: [
    SignInUseCase,
    PrismaService,
    {
      provide: ISignInRepository,
      useClass: SignInPrismaRepository,
    },
  ],
  exports: [SignInUseCase],
})
export class LoginModule {}
