import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransmissionReceptionService } from './service/transmission-receptions.service';
import { TransmissionReceptionController } from './controller/transmission-receptions.controller';
import { TransmissionReceptionEntity } from '@entities/transmission-reception.entity';
import { DetailTransmissionReceptionEntity } from '@entities/detail-transmission-reception.entity';
import { BonEngagementEntity } from '@entities/bon-engagement.entity';
import { TransmissionReceptionDetailService } from './service/transmission-receptions-details.service';
import { TransmissionReceptionDetailController } from './controller/transmission-reception-details.controller';

@Module({
  controllers: [TransmissionReceptionController,TransmissionReceptionDetailController],
  providers: [TransmissionReceptionService,TransmissionReceptionDetailService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      TransmissionReceptionEntity,
      DetailTransmissionReceptionEntity,
      BonEngagementEntity
 
    ]),
  ],
  exports: [
    TypeOrmModule,
    TransmissionReceptionService,
    TransmissionReceptionDetailService,
  ],
})
export class TransmissionReceptionModule {}
