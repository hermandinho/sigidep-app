import { ModelVirementEntity } from '@entities/model-virement.entity';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeleVirementsController } from './modele-virements.controller';
import { ModeleVirementsService } from './modele-virements.service';

@Module({
  controllers: [ModeleVirementsController],
  providers: [ModeleVirementsService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ModelVirementEntity]),
  ],
})
export class ModeleVirementsModule { }
