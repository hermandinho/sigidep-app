import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonEngagementEntity } from '@entities/bon-engagement.entity';
import { TraitementBonEngagementService } from './service/traitement-bon-engagement.service';
import { BonEngagementHistoryEntity } from '@entities/bon-engagement.history.entity';
import { TraitementBonEngagementEntity } from '@entities/traitement-bon-engagement.entity';
import { PaiementEntity } from '@entities/paiement.entity';
import { FactureEntity } from '@entities/facture.entity';
import { FactureArticleEntity } from '@entities/facture-article.entity';
import { BonEngagementService } from './service/bons-engagements.service';
import { BonEngagementController } from './controller/bons-engagements.controller';
import { EngagementJuridiqueService } from '@modules/engagement-juridiques/service/engagement-juridique.service';
import { EngagementJuridiqueModule } from '@modules/engagement-juridiques/engagement-juridique.module';
import { EngagementJuridiqueEntity } from '@entities/engagement-juridique.entity';
import { TraitementBonEngagementController } from './controller/traitement-bon-engagement.controller';

@Module({
  controllers: [BonEngagementController,TraitementBonEngagementController],
  providers: [BonEngagementService, TraitementBonEngagementService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      BonEngagementEntity,
      TraitementBonEngagementEntity,
      BonEngagementHistoryEntity,
      PaiementEntity,
      FactureEntity,
      FactureArticleEntity,
      EngagementJuridiqueEntity,
    ]),
  ],
  exports: [
    TypeOrmModule,
    BonEngagementService,
    TraitementBonEngagementService,
  ],
})
export class BonsEngagementsModule {}
