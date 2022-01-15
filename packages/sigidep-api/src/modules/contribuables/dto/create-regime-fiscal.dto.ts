import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRegimeFiscalDTO {
  @ApiProperty({ example: 'REEL', required: true })
  @IsNotEmpty()
  @MinLength(2)
  public code: string;

  @ApiProperty({ example: 'REGIME REEL', required: false })
  @IsNotEmpty()
  public description: string;
}
