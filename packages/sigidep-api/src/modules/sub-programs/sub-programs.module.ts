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

@Module({
  controllers: [SubProgramsController],
  providers: [SubProgramsService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      SubProgramEntity,
      SubProgramActivityEntity,
      SubProgramActivityTaskEntity,
    ]),
    FinancialSourcesModule,
    AdministrativeUnitsModule,
  ],
})
export class SubProgramsModule {}
