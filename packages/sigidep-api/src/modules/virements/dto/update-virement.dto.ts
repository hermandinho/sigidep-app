import { PartialType } from '@nestjs/swagger';
import { CreateVirementDto } from './create-virement.dto';

export class UpdateVirementDto extends PartialType(CreateVirementDto) {}
