import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialSourcesModule } from '@modules/financial-sources/financial-sources.module';

import { RegimeFiscalService } from './regime-fiscal.service';
import { RegimeFiscalEntity } from '@entities/regime-fiscal.entity';
import { RegimeFiscalController } from './regime-fiscal.controller';

@Module({
  controllers: [RegimeFiscalController],
  providers: [RegimeFiscalService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([RegimeFiscalEntity]),
    FinancialSourcesModule,
  ],
  exports: [TypeOrmModule, RegimeFiscalService],
})
export class RegimeFiscalModule {}
