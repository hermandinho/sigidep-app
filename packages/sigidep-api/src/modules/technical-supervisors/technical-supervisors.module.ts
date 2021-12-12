import { Module } from '@nestjs/common';
import { TechnicalSupervisorsController } from './technical-supervisors.controller';
import { TechnicalSupervisorsService } from './technical-supervisors.service';
import { TechnicalSupervisionEntity } from '@entities/technical_supervision.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  controllers: [TechnicalSupervisorsController],
  providers: [TechnicalSupervisorsService],
  imports: [TypeOrmModule.forFeature([TechnicalSupervisionEntity]), AuthModule],
  exports: [TypeOrmModule],
})
export class TechnicalSupervisorsModule {}
