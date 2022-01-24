import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EditArticleMercurialeDTO } from '../dto';

export class EditSousRubriqueDTO {
  public id?: number;

  @ApiProperty({ example: '235', required: true })
  @IsNotEmpty()
  @Length(3, 3)
  public code: string;

  @ApiProperty({ example: 'MEUBLES EN CUIR', required: true })
  public label?: string;

  @ApiProperty({ required: false })
  public articles: EditArticleMercurialeDTO[];
}
