import { Module } from '@nestjs/common';
import { CarnetMandatController } from './carnet-mandat.controller';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarnetMandatEntity } from '@entities/carnet-mandat.entity';
import { CarnetMandatService } from './carnet-mandat.service';

@Module({
  controllers: [CarnetMandatController],
  providers: [CarnetMandatService],
  imports: [AuthModule, TypeOrmModule.forFeature([CarnetMandatEntity])],
  exports: [TypeOrmModule, CarnetMandatService],
})
export class CarnetMandatModule {}
