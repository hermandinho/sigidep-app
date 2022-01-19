import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategorieAgentsDTO {
  public id?: number;

  @ApiProperty({ example: 'Fonctionnaire', required: true })
  @IsNotEmpty()
  @MinLength(2)
  public code: string;

  @ApiProperty({ example: 'Contractuel', required: false })
  public description: string;
}
