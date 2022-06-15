import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { AccreditationsService } from './accreditations.service';
import { AccreditationsController } from './accreditations.controller';
import { AccreditationEntity } from '@entities/accreditation.entity';
import { GestionnairesEntity } from '@entities/gestionnaire.entity';
import { AgentEntity } from '@entities/agent.entity';

@Module({
  controllers: [AccreditationsController],
  providers: [AccreditationsService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([AccreditationEntity, GestionnairesEntity, AgentEntity]),
  ],
})
export class AccreditationsModule { }
