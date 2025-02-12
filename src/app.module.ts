import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from './modules/user/user.module';
import { TodoModule } from './modules/todo/todo.module';
import { AuthenticationModule } from './modules/authentication/auth.module';
import { TaskModule } from './modules/tasks/tasks.module';
import { DatabaseModule } from './modules/database/database.module';
import { validateEnv } from './shared/validations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
    }),
    JwtModule.register({ global: true }),
    DatabaseModule,
    UserModule,
    TodoModule,
    AuthenticationModule,
    TaskModule,
  ],
})
export class AppModule {}
