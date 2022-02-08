import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EngagementJuridiqueEntity } from '@entities/engagement-juridique-entity';
import { EngagementJuridiqueController } from './engagement-juridique.controller';
import { EngagementJuridiqueService } from './engagement-juridique.service';

@Module({
  controllers: [EngagementJuridiqueController],
  providers: [EngagementJuridiqueService],
  imports: [AuthModule, TypeOrmModule.forFeature([EngagementJuridiqueEntity])],
  exports: [TypeOrmModule, EngagementJuridiqueService],
})
export class EngagementJuridiqueModule {}
