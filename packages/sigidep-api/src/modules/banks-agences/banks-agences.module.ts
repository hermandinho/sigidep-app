import { AgencesEntity } from './../../entities/agence.entity';
import { BanksEntity } from './../../entities/bank.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { AgencesController } from './agences.controller';
import { AgencesService } from './agences.service';
import { BanksController } from './banks.controller';
import { BanksService } from './banks.service';

@Module({
  controllers: [AgencesController, BanksController],
  providers: [BanksService, AgencesService],
  imports: [AuthModule, TypeOrmModule.forFeature([BanksEntity, AgencesEntity])],
})
export class BanksAgencesModule {}
