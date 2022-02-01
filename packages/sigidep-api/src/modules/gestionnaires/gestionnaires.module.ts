import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth/auth.module';
import { GestionnairesEntity } from './../../entities/gestionnaire.entity';
import { Module } from '@nestjs/common';
import { GestionnairesService } from './gestionnaires.service';
import { GestionnairesController } from './gestionnaires.controller';

@Module({
  controllers: [GestionnairesController],
  providers: [GestionnairesService],
  imports: [AuthModule, TypeOrmModule.forFeature([GestionnairesEntity])],
})
export class GestionnairesModule {}
