import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialSourcesModule } from '@modules/financial-sources/financial-sources.module';

import { CategoriesAgentsService } from './categories-agents.service';
import { CategoriesAgentsController } from './categories-agents.controller';
import { CategorieAgentEntity } from '@entities/categorie-agent.entity';

@Module({
  controllers: [CategoriesAgentsController],
  providers: [CategoriesAgentsService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([CategorieAgentEntity]),
    FinancialSourcesModule,
  ],
  exports: [TypeOrmModule, CategoriesAgentsService],
})
export class CategoriesAgentsModule {}
