import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { GradeEntity } from '@entities/grade.entity';

@Module({
  controllers: [GradesController],
  providers: [GradesService],
  imports: [AuthModule, TypeOrmModule.forFeature([GradeEntity])],
  exports: [TypeOrmModule, GradesService],
})
export class GradesModule {}
