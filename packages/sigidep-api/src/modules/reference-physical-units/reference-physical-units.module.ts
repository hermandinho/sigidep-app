import { Module } from '@nestjs/common';
import { ReferencePhysicalUnitsController } from './reference-physical-units.controller';
import { ReferencePhysicalUnitsService } from './reference-physical-units.service';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferencePhysicalUnitEntity } from '@entities/reference-physical-unit.entity';
import { ParagraphsModule } from '@modules/paragraphs/paragraphs.module';

@Module({
  controllers: [ReferencePhysicalUnitsController],
  providers: [ReferencePhysicalUnitsService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ReferencePhysicalUnitEntity]),
    ParagraphsModule,
  ],
  exports: [TypeOrmModule],
})
export class ReferencePhysicalUnitsModule {}
