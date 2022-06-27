import { PartialType } from '@nestjs/swagger';
import { CreateModelVirementDto } from './create-model-virement.dto';

export class UpdateModelVirementDto extends PartialType(CreateModelVirementDto) {}
