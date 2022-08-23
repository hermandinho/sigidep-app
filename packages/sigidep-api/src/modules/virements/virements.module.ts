import { Module } from '@nestjs/common';
import { VirementsService } from './virements.service';
import { VirementsController } from './virements.controller';
import { AuthModule } from '@modules/auth/auth.module';
import { EncoursEntity } from '@entities/encours.entity';
import { VirementEntity } from '@entities/virement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubProgramEntity } from '@entities/sub-program.entity';

@Module({
  controllers: [VirementsController],
  providers: [VirementsService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      SubProgramEntity,
      VirementEntity,
      EncoursEntity,
    ]),
  ],
})
export class VirementsModule { }
