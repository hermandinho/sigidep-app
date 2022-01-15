import { Module } from '@nestjs/common';
import { ContribuablesController } from './contribuables.controller';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialSourcesModule } from '@modules/financial-sources/financial-sources.module';
import { ContribuablesService } from './contribuables.service';
import { ContribuableEntity } from '@entities/contribuable.entity';

@Module({
  controllers: [ContribuablesController],
  providers: [ContribuablesService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ContribuableEntity]),
    FinancialSourcesModule,
  ],
  exports: [TypeOrmModule, ContribuablesService],
})
export class ContribuablesModule {}
