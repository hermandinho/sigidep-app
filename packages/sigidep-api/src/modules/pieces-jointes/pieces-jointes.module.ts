import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PiecesJointesController } from './pieces-jointes.controller';
import { PiecesJointesService } from './pieces-jointes.service';
import { PieceJointeEntity } from '@entities/piece-jointe.entity';

@Module({
  controllers: [PiecesJointesController],
  providers: [PiecesJointesService],
  imports: [AuthModule, TypeOrmModule.forFeature([PieceJointeEntity])],
  exports: [TypeOrmModule, PiecesJointesService],
})
export class PiecesJointesModule {}
