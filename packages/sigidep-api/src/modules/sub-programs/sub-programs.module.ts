import { Module } from '@nestjs/common';
import { SubProgramsController } from './sub-programs.controller';
import { SubProgramsService } from './sub-programs.service';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubProgramEntity } from '@entities/sub-program.entity';
import { SubProgramActivityEntity } from '@entities/sub-program-activity.entity';
import { SubProgramActivityTaskEntity } from '@entities/sub-program-activity-task.entity';

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
  ],
})
export class SubProgramsModule {}
