import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GradesService } from './grades.service';
import { GradeEntity } from '@entities/grade.entity';
import { GradesController } from './grades.controller';

@Module({
  controllers: [GradesController],
  providers: [GradesService],
  imports: [AuthModule, TypeOrmModule.forFeature([GradeEntity])],
  exports: [TypeOrmModule, GradesService],
})
export class GradesModule {}
