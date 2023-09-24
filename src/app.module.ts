import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infra/prisma.module';
import { UserModule } from './modules/users/user.module';
import { LoginModule } from './modules/login/login.module';
import { TaskUserModule } from './modules/tasks/task-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    LoginModule,
    TaskUserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
