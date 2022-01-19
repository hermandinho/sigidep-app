import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialSourcesModule } from '@modules/financial-sources/financial-sources.module';

import { GradesService } from './grades.service';
import { GradeEntity } from '@entities/grade.entity';
import { GradesController } from './grades.controller';

@Module({
  controllers: [GradesController],
  providers: [GradesService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([GradeEntity]),
    FinancialSourcesModule,
  ],
  exports: [TypeOrmModule, GradesService],
})
export class RegimeFiscalModule {}
