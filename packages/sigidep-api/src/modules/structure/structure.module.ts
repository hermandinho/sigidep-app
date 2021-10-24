import { Module } from '@nestjs/common';
import { StructureController } from './structure.controller';
import { StructureService } from './structure.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StructureEntity } from 'src/entities/structure.entity';

@Module({
  controllers: [StructureController],
  providers: [StructureService],
  imports: [TypeOrmModule.forFeature([StructureEntity])],
})
export class StructureModule {}
