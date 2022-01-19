import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGradeDTO {
  public id?: number;

  @ApiProperty({ example: 'A2', required: true })
  @IsNotEmpty()
  @MinLength(2)
  public code: string;

  @ApiProperty({ example: 'A1', required: false })
  public description: string;
}
