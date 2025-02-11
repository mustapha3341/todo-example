import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from './modules/user/user.module';
import { TodoModule } from './modules/todo/todo.module';
import { AuthenticationModule } from './modules/authentication/auth.module';
import { TaskModule } from './modules/tasks/tasks.module';
import { User } from './modules/user/entities/user.entity';
import { Task } from './modules/tasks/entities/task.entity';
import { Todo } from './modules/todo/entities/todo.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({ global: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_NAME || 'todo_db',
      entities: [User, Task, Todo],
      synchronize: true,
    }),
    UserModule,
    TodoModule,
    AuthenticationModule,
    TaskModule,
  ],
})
export class AppModule {}
