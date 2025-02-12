import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnv } from 'src/shared/helpers/env.helper';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const env = getEnv();

        if (env.isDevelopment()) {
          return {
            type: 'mysql',
            host: 'ql3.freesqldatabase.com',
            port: env.DB_PORT,
            username: env.DB_USERNAME,
            password: env.DB_PASSWORD,
            database: env.DB_DATABASE_NAME,
            ssl: false,
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            synchronize: true,
            autoLoadEntities: true,
          };
        }

        return {
          type: 'mysql',
          url: env.DATABASE_URL,
          ssl: true,
          extra: { ssl: { rejectUnauthorized: false } },
          entities: [__dirname + '/../**/*.entity.{js,ts}'],
          synchronize: false,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
