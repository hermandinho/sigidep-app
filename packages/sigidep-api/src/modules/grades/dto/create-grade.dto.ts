import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGradeDTO {
  public id?: number;

  @ApiProperty({ example: 'GRADE1', required: true })
  @IsNotEmpty()
  @MinLength(2)
  public code: string;

  @ApiProperty({ example: 'GRADE2', required: false })
  public description?: string;
}
