import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EncoursService } from './encours.service';
import { EncoursController } from './encours.controller';
import { EncoursEntity } from '@entities/encours.entity';
import { SubProgramEntity } from '@entities/sub-program.entity';
import { SubProgramActionEntity } from '@entities/sub-program-action.entity';
import { SubProgramActivityEntity } from '@entities/sub-program-activity.entity';
import { SubProgramActivityTaskEntity } from '@entities/sub-program-activity-task.entity';
import { SubProgramActivityTaskOperationEntity } from '@entities/sub-program-activity-task-operation.entity';
import { SubProgramActivityTaskOperationPhysicalUnitEntity } from '@entities/sub-program-activity-task-operation-physical-unit.entity';

@Module({
  controllers: [EncoursController],
  providers: [EncoursService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      EncoursEntity,
      SubProgramEntity,
      SubProgramActionEntity,
      SubProgramActivityEntity,
      SubProgramActivityTaskEntity,
      SubProgramActivityTaskOperationEntity,
      SubProgramActivityTaskOperationPhysicalUnitEntity,
    ]),
  ],
  exports: [TypeOrmModule, EncoursService],
})
export class EncoursModule {}
