//ces champs sonts passés uniquement lors du traitement

import { ApiProperty } from '@nestjs/swagger';
import { EtatMandatEnum } from '@utils/etat-mandat.enum';

export class CreateTraitementMandatDTO {
  id?: number;
  @ApiProperty({ example: '120', required: true })
  mandatId!: number;

  @ApiProperty({ example: EtatMandatEnum.ANNULATIONMANDAT, required: false })
  etat!: EtatMandatEnum;

  @ApiProperty({ example: 'RAS', required: false })
  observation!: string;

  @ApiProperty({ example: '1500', required: false })
  qteUnitePhysiqueReal!: number;

  @ApiProperty({ example: '450000.0', required: false })
  montantTotalUnitPhysReal!: number;
}
