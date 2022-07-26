import { EditArticleMercurialeDTO } from '@modules/mercuriales/dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFactureDTO {
  id?: number;
  @ApiProperty({ example: 'CARNET0001', required: false })
  date: Date;
  @ApiProperty({ example: 'CARNET0001', required: false })
  reference: string;

  @ApiProperty({ example: 'OBJET', required: false })
  objet: string;

  @ApiProperty({ example: '7368594', required: false })
  montantTTC: number;
  @ApiProperty({ example: '46446436', required: false })
  montantHT: number;

  @ApiProperty({ example: '3346', required: false })
  montantTVA: number;

  @ApiProperty({ example: '19.5', required: false })
  tauxTVA: number;
  @ApiProperty({ example: '5.5', required: false })
  tauxIR: number;

  @ApiProperty({ example: '466466', required: false })
  montantIR: number;
  @ApiProperty({ example: '64646436', required: false })
  netAPercevoir: number;

  @ApiProperty({ example: true, required: false })
  surfracturation: boolean;

  @ApiProperty({ example: false, required: false })
  morcellement: boolean;

  @ApiProperty({
    type: () => EditArticleMercurialeDTO,
    required: true,
  })
  articles: EditArticleMercurialeDTO[];
}
