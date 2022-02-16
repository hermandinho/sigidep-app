import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExecTaxesController } from './exec-taxes.controller';
import { ExecTaxesService } from './exec-taxes.service';
import { ExecTaxesEntity } from '@entities/exec-taxes.entity';

@Module({
  controllers: [ExecTaxesController],
  providers: [ExecTaxesService],
  imports: [AuthModule, TypeOrmModule.forFeature([ExecTaxesEntity])],
  exports: [TypeOrmModule, ExecTaxesService],
})
export class ExecTaxesModule {}
