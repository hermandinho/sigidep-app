import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { StructureModule } from './modules/structure/structure.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const env = process.env.NODE_ENV || 'local';
        // tslint:disable-next-line:no-console
        console.log(
          '******* Server running on Port : ' +
            process.env.API_PORT +
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
          // subscribers: ['dist/subscribers/*.subscriber.js'],
          synchronize: true,
          type: 'postgres',
          port: +process.env.DB_PORT,
          // dropSchema: true,
          // logging: true,
          // migrationsTableName: 'migrations',
          // migrations: ['migration/*.js'],
          // cli: {
          //   migrationsDir: 'migration',
          // },
        } as TypeOrmModuleOptions;
      },
    }),
    StructureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
