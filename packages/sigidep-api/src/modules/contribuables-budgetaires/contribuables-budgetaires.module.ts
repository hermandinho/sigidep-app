import { AuthModule } from './../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContribuableBudgetaireEntity } from './../../entities/contribuable-budgetaire.entity';
import { Module } from '@nestjs/common';
import { ContribuablesBudgetairesService } from './contribuables-budgetaires.service';
import { ContribuablesBudgetairesController } from './contribuables-budgetaires.controller';

@Module({
  controllers: [ContribuablesBudgetairesController],
  providers: [ContribuablesBudgetairesService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ContribuableBudgetaireEntity]),
  ],
})
export class ContribuablesBudgetairesModule {}
