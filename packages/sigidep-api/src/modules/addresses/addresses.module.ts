import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from '@entities/region.entity';
import { DepartmentEntity } from '@entities/department.entity';
import { AuthModule } from '@modules/auth/auth.module';
import { AddressesService } from './addresses.service';
import { AddressesController } from '@modules/addresses/addresses.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegionEntity, DepartmentEntity]),
    AuthModule,
  ],
  exports: [TypeOrmModule, AddressesService],
  providers: [AddressesService],
  controllers: [AddressesController],
})
export class AddressesModule {}
