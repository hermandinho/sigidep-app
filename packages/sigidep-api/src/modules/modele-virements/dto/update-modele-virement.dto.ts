import { PartialType } from '@nestjs/swagger';
import { CreateModeleVirementDto } from './create-modele-virement.dto';

export class UpdateModeleVirementDto extends PartialType(CreateModeleVirementDto) { }
