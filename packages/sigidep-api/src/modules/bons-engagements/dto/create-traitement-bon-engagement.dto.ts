//ces champs sonts passés uniquement lors du traitement

import { ApiProperty } from '@nestjs/swagger';
import { EtatBonEnum } from '@utils/etat-bon.enum';
import { CreateBonEngagementDTO } from './create-bon-engagement.dto';
import { PieceJointeEntity } from '../../../entities/piece-jointe.entity';

export class CreateTraitementBonEngagementDTO {
  id?: number;
  @ApiProperty({ required: true })
  bon?: CreateBonEngagementDTO;

  @ApiProperty({ example: EtatBonEnum.ANNULELORSRESERVATION, required: false })
  typeTraitement?: EtatBonEnum;

  @ApiProperty({ example: 'RAS', required: false })
  observation?: string;

  @ApiProperty({ example: '1500', required: false })
  qteUnitePhysiqueReal?: number;

  @ApiProperty({ example: '450000.0', required: false })
  montantTotalUnitPhysReal?: number;
  
  @ApiProperty({ required: false })
  dateLiquidation?: Date;

  @ApiProperty({ required: false })
  numOrdreLiquidation?: string;

  @ApiProperty({ required: false })
  rubriqueLiquidation?: string;

  @ApiProperty({ required: false })
  montantLiquidation?: number;

  @ApiProperty({ required: false })
  liquidation?: boolean;

  @ApiProperty({ required: false })
  dateOrdonnancement?: Date;

  @ApiProperty({ required: false })
  ordonnancement?: boolean;

  @ApiProperty({ required: false })
  numOrdreOrdonnancement?: string;

  @ApiProperty({ required: false })
  rubriqueOrdonnancement?: string;

  @ApiProperty({ required: false })
  montantOrdonnancement?: number;

  @ApiProperty({ required: false })
  motif?: string;
  @ApiProperty({ required: false })
  piecesJointe!: PieceJointeEntity;

  @ApiProperty({ required: false })
  action!: string;
}
