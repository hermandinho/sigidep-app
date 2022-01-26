import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditRubriqueDTO {
  public id?: number;

  @ApiProperty({ example: '12', required: true })
  @IsNotEmpty()
  @Length(2, 2)
  public code: string;

  @ApiProperty({ example: 'MEUBLES', required: true })
  public label?: string;
}
