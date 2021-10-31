import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { FinancialSourcesModule } from '@modules/financial-sources/financial-sources.module';
import { AdministrativeUnitsModule } from '@modules/administrative-units/administrative-units.module';
import { AddressesModule } from '@modules/addresses/addresses.module';

@Module({
  providers: [SeederService],
  controllers: [SeederController],
  imports: [
    UsersModule,
    AuthModule,
    FinancialSourcesModule,
    AdministrativeUnitsModule,
    AddressesModule,
  ],
})
export class SeederModule {}
