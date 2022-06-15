//ces champs sonts passés uniquement lors du traitement

import { ApiProperty } from '@nestjs/swagger';
import { EtatMandatEnum } from '@utils/etat-mandat.enum';

export class CreateTraitementMandatDTO {
  id?: number;
  @ApiProperty({ example: '120', required: true })
  mandat!: number;

  @ApiProperty({ example: EtatMandatEnum.ANNULATIONMANDAT, required: false })
  typeTraitement!: EtatMandatEnum;

  @ApiProperty({ example: 'RAS', required: false })
  observation!: string;

  @ApiProperty({ example: '1500', required: false })
  qteUnitePhysiqueReal!: number;

  @ApiProperty({ example: '450000.0', required: false })
  montantTotalUnitPhysReal!: number;
}
