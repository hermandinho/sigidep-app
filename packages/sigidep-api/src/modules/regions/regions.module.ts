import { RegionEntity } from '@entities/region.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegionEntity])],
  exports: [],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}
