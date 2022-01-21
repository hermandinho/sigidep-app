import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EditSousRubriqueDTO } from '../dto';

export class EditArticleMercurialeDTO {
  public id?: number;
  @ApiProperty({ example: '12500856452', required: true })
  @IsNotEmpty()
  //@Length(11, 11)
  public code: string;

  @ApiProperty({ example: 'MEUBLES EN CUIR VERT', required: true })
  public designation: string;

  @ApiProperty({ example: 'A SEC', required: false })
  public conditionnement: string;

  @ApiProperty({ example: '50000.50', required: false })
  public prix: number;

  @ApiProperty({ example: '', required: true })
  public sousRubrique: EditSousRubriqueDTO;
}
