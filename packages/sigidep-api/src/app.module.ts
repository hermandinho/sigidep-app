import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { StructureModule } from '@modules/structure/structure.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { SeederModule } from '@modules/seeder/seeder.module';
import { ExercisesModule } from '@modules/exercises/exercises.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from '@modules/roles/roles.module';
import { FinancialSourcesModule } from '@modules/financial-sources/financial-sources.module';
import { AdministrativeUnitsModule } from '@modules/administrative-units/administrative-units.module';
import { AddressesModule } from '@modules/addresses/addresses.module';
import { TechnicalSupervisorsModule } from '@modules/technical-supervisors/technical-supervisors.module';
import { ParagraphsModule } from './modules/paragraphs/paragraphs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '../../.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const env = config.get('NODE_ENV') ?? process.env.NODE_ENV ?? 'local';
        const database = config.get('DB_NAME') ?? process.env.DB_NAME;
        const host = config.get('DB_HOST') ?? process.env.DB_HOST;
        const password = config.get('DB_PASSWORD') ?? process.env.DB_PASSWORD;
        const username = config.get('DB_USER') ?? process.env.DB_USER;
        // tslint:disable-next-line:no-console
        console.log(database, host, password, username);
        console.log(
          '******* Server running on Port : ' +
            (config.get('API_PORT') ??
              process.env.PORT ??
              process.env.API_PORT) +
            ' on ' +
            env +
            ' Environment ********',
        );
        return {
          database,
          host,
          password,
          username,
          entities: ['dist/**/*.entity.js'],
          // subscribers: ['dist/subscribers/*.subscriber.js'],
          synchronize: true,
          type: 'postgres',
          port: 5432,
          // autoLoadEntities: true,
          // dropSchema: true,
          // logging: true,
          // migrationsTableName: 'migrations',
          // migrations: ['migration/*.js'],
          // cli: {
          //   migrationsDir: 'migration',
          // },
          ...(env !== 'production'
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
    ExercisesModule,
    RolesModule,
    FinancialSourcesModule,
    AdministrativeUnitsModule,
    AddressesModule,
    TechnicalSupervisorsModule,
    ParagraphsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
