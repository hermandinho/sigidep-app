import { ApiProperty } from '@nestjs/swagger';
import { CreateBonEngagementDTO } from './create-bon-engagement.dto';

export class CreatePaiementDTO {
  id?: number;
  @ApiProperty({ required: true })
  numeroPaiement?: string;
  @ApiProperty({ required: true })
  bon?: CreateBonEngagementDTO;

  @ApiProperty({ required: false })
  dateValidACT?: boolean;

  @ApiProperty({ required: false })
  modePaiement?: string;

  @ApiProperty({ required: false })
  compteADebiter?: string;

  @ApiProperty({ required: false })
  compteACrediter?: string;

  @ApiProperty({ required: false })
  motif?: string;
  @ApiProperty({ required: false })
  datePaiement!: Date;

  @ApiProperty({ required: false })
  villePaiement!: string;

  @ApiProperty({ required: false })
  action!: string;

  @ApiProperty({ required: false })
  data!: any;

  @ApiProperty({ required: false })
  paye!: boolean;

  @ApiProperty({ required: false })
  validACT!: boolean;

  @ApiProperty({ required: false })
  numeroCNI!: string;

  @ApiProperty({ required: false })
  dateDelivrance!: string;

  @ApiProperty({ required: false })
  lieuDelivrance!: string;
}
