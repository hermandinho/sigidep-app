//ces champs sonts passés uniquement lors du traitement

import { ApiProperty } from '@nestjs/swagger';
import { EtatBonEnum } from '@utils/etat-bon.enum';
import { CreateBonEngagementDTO } from './create-bon-engagement.dto';

export class CreateTraitementBonEngagementDTO {
  id?: number;
  @ApiProperty({ required: true })
  bon!: CreateBonEngagementDTO;

  @ApiProperty({ example: EtatBonEnum.ANNULELORSRESERVATION, required: false })
  typeTraitement!: EtatBonEnum;

  @ApiProperty({ example: 'RAS', required: false })
  observation!: string;

  @ApiProperty({ example: '1500', required: false })
  qteUnitePhysiqueReal!: number;

  @ApiProperty({ example: '450000.0', required: false })
  montantTotalUnitPhysReal!: number;
}
