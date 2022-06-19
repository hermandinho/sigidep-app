import { Module } from '@nestjs/common';
import { VirementsService } from './virements.service';
import { VirementsController } from './virements.controller';

@Module({
  controllers: [VirementsController],
  providers: [VirementsService]
})
export class VirementsModule {}
