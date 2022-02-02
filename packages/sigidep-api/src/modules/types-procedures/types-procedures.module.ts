import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesProceduresController } from './types-procedures.controller';
import { TypeProcedureEntity } from '@entities/type-procedure.entity';
import { TypesProceduresService } from './types-procedures.service';

@Module({
  controllers: [TypesProceduresController],
  providers: [TypesProceduresService],
  imports: [AuthModule, TypeOrmModule.forFeature([TypeProcedureEntity])],
  exports: [TypeOrmModule, TypesProceduresService],
})
export class TypesProceduresModule {}
