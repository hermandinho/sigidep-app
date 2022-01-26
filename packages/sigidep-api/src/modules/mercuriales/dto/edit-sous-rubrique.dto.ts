import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EditRubriqueDTO } from './edit-rubrique.dto';

export class EditSousRubriqueDTO {
  public id?: number;

  @ApiProperty({ example: '235', required: true })
  @IsNotEmpty()
  @Length(3, 3)
  public code: string;

  @ApiProperty({ example: 'MEUBLES EN CUIR', required: false })
  public label?: string;

  @ApiProperty({ example: '', required: true })
  public rubrique: EditRubriqueDTO;
}
