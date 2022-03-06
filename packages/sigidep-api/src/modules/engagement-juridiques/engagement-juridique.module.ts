import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EngagementJuridiqueEntity } from '@entities/engagement-juridique.entity';
import { EngagementJuridiqueController } from './controller/engagement-juridique.controller';
import { EngagementJuridiqueService } from './service/engagement-juridique.service';
import { EngagementCommandeEntity } from '@entities/engagement-commande.entity';
import { EngagementMissionEntity } from '@entities/engagement-mission.entity';
import { EngagementDecisionEntity } from '@entities/engagement-decision.entity';
import { EngagementDecisionController } from './controller/engagement-decision.controller';
import { EngagementMissionController } from './controller/engagement-mission.controller';
import { EngagementCommandeController } from './controller/engagement-commande.controller';
import { EngagementCommandeService } from './service/engagement-commande.service';
import { EngagementMissionService } from './service/engagement-mission.service';
import { EngagementDecisionService } from './service/engagement-decision.service';

@Module({
  controllers: [
    EngagementJuridiqueController,
    EngagementCommandeController,
    EngagementMissionController,
    EngagementDecisionController,
  ],
  providers: [
    EngagementJuridiqueService,
    EngagementCommandeService,
    EngagementMissionService,
    EngagementDecisionService,
  ],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      EngagementJuridiqueEntity,
      EngagementCommandeEntity,
      EngagementMissionEntity,
      EngagementDecisionEntity,
    ]),
  ],
  exports: [
    TypeOrmModule,
    EngagementJuridiqueService,
    EngagementCommandeService,
    EngagementMissionService,
    EngagementDecisionService,
  ],
})
export class EngagementJuridiqueModule {}
