import { Module } from '@nestjs/common';
import { FinancialSourcesService } from './financial-sources.service';
import { FinancialSourcesController } from './financial-sources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialSourceEntity } from '@entities/financial-source.entity';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  providers: [FinancialSourcesService],
  controllers: [FinancialSourcesController],
  imports: [AuthModule, TypeOrmModule.forFeature([FinancialSourceEntity])],
  exports: [TypeOrmModule],
})
export class FinancialSourcesModule {}
