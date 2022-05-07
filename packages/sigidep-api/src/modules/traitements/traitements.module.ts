import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TraitementService } from './traitements.service';
import { TraitementEntity } from '@entities/traitement.entity';
import { TraitementController } from './traitements.controller';

@Module({
  controllers: [TraitementController],
  providers: [TraitementService],
  imports: [AuthModule, TypeOrmModule.forFeature([TraitementEntity])],
  exports: [TypeOrmModule, TraitementService],
})
export class TraitementsModule {}
