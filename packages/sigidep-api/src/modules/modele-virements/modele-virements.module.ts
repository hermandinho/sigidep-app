import { Module } from '@nestjs/common';
import { ModeleVirementsController } from './modele-virements.controller';
import { ModeleVirementsService } from './modele-virements.service';

@Module({
  controllers: [ModeleVirementsController],
  providers: [ModeleVirementsService]
})
export class ModeleVirementsModule {}
