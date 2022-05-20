import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MandatService } from './service/mandats.service';
import { MandatController } from './controller/mandats.controller';
import { MandatEntity } from '@entities/mandat.entity';
import { TraitementMandatService } from './service/traitement-mandat.service';
import { MandatHistoryEntity } from '@entities/mandat.history.entity';
import { TraitementMandatEntity } from '@entities/traitement-mandat.entity';

@Module({
  controllers: [MandatController],
  providers: [MandatService, TraitementMandatService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      MandatEntity,
      TraitementMandatEntity,
      MandatHistoryEntity,
    ]),
  ],
  exports: [TypeOrmModule, MandatService, TraitementMandatService],
})
export class MandatsModule {}
