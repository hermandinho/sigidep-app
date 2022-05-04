import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngagementMandatsService } from './service/engagement-mandats.service';
import { EngagementMandatEntity } from '@entities/engagement-mandat.entity';
import { EngagementMandatController } from './controller/engagement-mandats.controller';


@Module({
  controllers: [
    EngagementMandatController,
  ],
  providers: [
    EngagementMandatsService,
  ],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      EngagementMandatEntity,
    ]),
  ],
  exports: [
    TypeOrmModule,
    EngagementMandatsService,
  ],
})
export class EngagementMandatsModule {}
