import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaremeMissionController } from './bareme-mission.controller';
import { BaremeMissionService } from './bareme-mission.service';
import { BaremeMissionEntity } from '@entities/bareme-mission.entity';

@Module({
  controllers: [BaremeMissionController],
  providers: [BaremeMissionService],
  imports: [AuthModule, TypeOrmModule.forFeature([BaremeMissionEntity])],
  exports: [TypeOrmModule, BaremeMissionService],
})
export class BaremesMissionsModule {}
