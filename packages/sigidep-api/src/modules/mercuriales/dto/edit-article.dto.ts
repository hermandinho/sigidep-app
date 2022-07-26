import { IsDefined, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EditSousRubriqueDTO } from '../dto';
import { Type } from 'class-transformer';

export class EditArticleMercurialeDTO {
  public id?: number;
  @ApiProperty({ example: '000001', required: true })
  @IsNotEmpty()
  public serie: string;

  @ApiProperty({ example: '01-001-000001', required: true })
  @IsNotEmpty()
  public code: string;

  @ApiProperty({ example: 'MEUBLES EN CUIR VERT', required: true })
  public designation: string;

  @ApiProperty({ example: 'A SEC', required: false })
  public conditionnement: string;

  @ApiProperty({ example: '50000.50', required: false })
  public prix: number;

  @ApiProperty({ example: '510', required: false })
  public quantite?: number;

  @ApiProperty({ type: () => EditSousRubriqueDTO, required: true })
  @IsDefined()
  @Type(() => EditSousRubriqueDTO)
  public sousRubrique: EditSousRubriqueDTO;
}
