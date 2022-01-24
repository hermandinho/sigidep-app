import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRegimeFiscalDTO {
  public id?: number;

  @ApiProperty({ example: 'REEL', required: true })
  @IsNotEmpty()
  @MinLength(2)
  public code: string;

  @ApiProperty({ example: 'REGIME REEL', required: false })
  public description: string;
}
