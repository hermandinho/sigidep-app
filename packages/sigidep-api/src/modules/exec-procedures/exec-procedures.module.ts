import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExecProcedureService } from './exec-procedures.service';
import { ExecProceduresController } from './exec-procedures.controller';
import { ExecProcedureEntity } from '@entities/exec-procedure.entity';

@Module({
  controllers: [ExecProceduresController],
  providers: [ExecProcedureService],
  imports: [AuthModule, TypeOrmModule.forFeature([ExecProcedureEntity])],
  exports: [TypeOrmModule, ExecProcedureService],
})
export class ExecProcedureModule {}
