import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { StructureModule } from '@modules/structure/structure.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { SeederModule } from '@modules/seeder/seeder.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const env = process.env.NODE_ENV || 'local';
        // tslint:disable-next-line:no-console
        console.log(
          '******* Server running on Port : ' +
            (process.env.PORT ?? process.env.API_PORT) +
            ' on ' +
            env +
            ' Environment ********',
        );
        return {
          database: process.env.DB_NAME,
          host: process.env.DB_HOST,
          password: process.env.DB_PASSWORD,
          username: process.env.DB_USER,
          entities: ['dist/**/*.entity.js'],
          // entities: [__dirname + '/**/*.entity.{ts,js}'],
          // subscribers: ['dist/subscribers/*.subscriber.js'],
          synchronize: true,
          type: 'postgres',
          port: +process.env.DB_PORT,
          // autoLoadEntities: true,
          // dropSchema: true,
          // logging: true,
          // migrationsTableName: 'migrations',
          // migrations: ['migration/*.js'],
          // cli: {
          //   migrationsDir: 'migration',
          // },
          ...(process.env.NODE_ENV !== 'production'
            ? {}
            : {
                extra: {
                  ssl: {
                    rejectUnauthorized: false,
                  },
                },
              }),
        } as TypeOrmModuleOptions;
      },
    }),
    SeederModule,
    AuthModule,
    StructureModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
