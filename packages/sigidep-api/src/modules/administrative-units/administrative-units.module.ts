import { Module } from '@nestjs/common';
import { AdministrativeUnitsService } from './services/administrative-units.service';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministrativeUnitEntity } from '@entities/administrative-unit.entity';
import { AdministrativeUnitsController } from '@modules/administrative-units/controllers/administrative-units.controller';
import { PrimaryFunctionsEntity } from '@entities/primary-functions.entity';
import { SecondaryFunctionsEntity } from '@entities/secondary-functions.entity';
import { CategoriesEntity } from '@entities/categories.entity';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { SectorsController } from './controllers/sectors.controller';
import { SectorsService } from '@modules/administrative-units/services/sectors.service';
import { SectorEntity } from '@entities/sector.entity';
import { AddressesModule } from '@modules/addresses/addresses.module';

@Module({
  controllers: [
    AdministrativeUnitsController,
    CategoriesController,
    SectorsController,
  ],
  providers: [AdministrativeUnitsService, CategoriesService, SectorsService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      AdministrativeUnitEntity,
      PrimaryFunctionsEntity,
      SecondaryFunctionsEntity,
      CategoriesEntity,
      SectorEntity,
    ]),
    AddressesModule,
  ],
  exports: [TypeOrmModule, AdministrativeUnitsService],
})
export class AdministrativeUnitsModule {}
