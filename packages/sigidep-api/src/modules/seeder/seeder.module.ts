import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { FinancialSourcesModule } from '@modules/financial-sources/financial-sources.module';
import { AdministrativeUnitsModule } from '@modules/administrative-units/administrative-units.module';
import { AddressesModule } from '@modules/addresses/addresses.module';
import { ContribuablesModule } from '@modules/contribuables/contribuables.module';
import { RegimeFiscalModule } from '@modules/regime-fiscal/regime-fiscal.module';
import { GradesModule } from '@modules/grades/grades.module';
import { CategoriesAgentsModule } from '@modules/categories-agents/categories-agents.module';
import { AgentsModule } from '@modules/agents/agents.module';
import { TypesProceduresModule } from '@modules/types-procedures/types-procedures.module';

@Module({
  providers: [SeederService],
  controllers: [SeederController],
  imports: [
    UsersModule,
    AuthModule,
    FinancialSourcesModule,
    AdministrativeUnitsModule,
    AddressesModule,
    ContribuablesModule,
    RegimeFiscalModule,
    GradesModule,
    CategoriesAgentsModule,
    AgentsModule,
    TypesProceduresModule,
  ],
})
export class SeederModule {}
