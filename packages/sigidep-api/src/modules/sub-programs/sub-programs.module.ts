/*
 * Built with ❣️ by El Manifico
 *
 * Email: hdemsongtsamo@gmail.com
 * Date: 12/11/21, 1:46 PM
 */

import { Module } from '@nestjs/common';
import { SubProgramsController } from './sub-programs.controller';
import { SubProgramsService } from './sub-programs.service';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubProgramEntity } from '@entities/sub-program.entity';
import { SubProgramActivityEntity } from '@entities/sub-program-activity.entity';
import { SubProgramActivityTaskEntity } from '@entities/sub-program-activity-task.entity';
import { FinancialSourcesModule } from '@modules/financial-sources/financial-sources.module';
import { AdministrativeUnitsModule } from '@modules/administrative-units/administrative-units.module';
import { SubProgramActivityTaskOperationEntity } from '@entities/sub-program-activity-task-operation.entity';
import { SubProgramActivityTaskOperationPhysicalUnitEntity } from '@entities/sub-program-activity-task-operation-physical-unit.entity';
import { AddressesModule } from '@modules/addresses/addresses.module';
import { ParagraphsModule } from '@modules/paragraphs/paragraphs.module';

@Module({
  controllers: [SubProgramsController],
  providers: [SubProgramsService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      SubProgramEntity,
      SubProgramActivityEntity,
      SubProgramActivityTaskEntity,
      SubProgramActivityTaskOperationEntity,
      SubProgramActivityTaskOperationPhysicalUnitEntity,
    ]),
    FinancialSourcesModule,
    AdministrativeUnitsModule,
    AddressesModule,
    ParagraphsModule,
  ],
})
export class SubProgramsModule {}
