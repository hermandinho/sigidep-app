import { Module } from '@nestjs/common';
import { AgentsController } from './agents.controller';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentsService } from './agents.service';
import { AgentEntity } from '@entities/agent.entity';

@Module({
  controllers: [AgentsController],
  providers: [AgentsService],
  imports: [AuthModule, TypeOrmModule.forFeature([AgentEntity])],
  exports: [TypeOrmModule, AgentsService],
})
export class AgentsModule {}
