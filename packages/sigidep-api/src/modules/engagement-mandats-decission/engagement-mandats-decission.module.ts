import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngagementMandatsDecissionService } from './service/engagement-mandats-decission.service';
import { EngagementMandatDecissionEntity } from '@entities/engagement-mandat-decission.entity';
import { EngagementMandatDecissionController } from './controller/engagement-mandats-decission.controller';


@Module({
  controllers: [
    EngagementMandatDecissionController,
  ],
  providers: [
    EngagementMandatsDecissionService,
  ],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      EngagementMandatDecissionEntity,
    ]),
  ],
  exports: [
    TypeOrmModule,
    EngagementMandatsDecissionService,
  ],
})
export class EngagementMandatsDecissionModule {}
