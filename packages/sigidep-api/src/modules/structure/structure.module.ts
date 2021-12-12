import { Global, Module } from '@nestjs/common';
import { StructureController } from './structure.controller';
import { StructureService } from './structure.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StructureEntity } from '@entities/structure.entity';

@Global()
@Module({
  controllers: [StructureController],
  providers: [StructureService],
  imports: [TypeOrmModule.forFeature([StructureEntity])],
  exports: [TypeOrmModule, StructureService],
})
export class StructureModule {}
