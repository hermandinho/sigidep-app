import { Module } from '@nestjs/common';
import { ModelVirementsService } from './model-virements.service';
import { ModelVirementsController } from './model-virements.controller';

@Module({
  controllers: [ModelVirementsController],
  providers: [ModelVirementsService]
})
export class ModelVirementsModule {}
