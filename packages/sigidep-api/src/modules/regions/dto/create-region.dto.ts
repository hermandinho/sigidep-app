import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateRegionDto {
  public id?: number;

  @ApiProperty({ example: '22', required: true })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  public code: string;

  @ApiProperty({ example: 'Ouest', required: true })
  @IsNotEmpty()
  public labelFr: string;

  @ApiProperty({ example: 'West', required: true })
  @IsNotEmpty()
  public labelEn: string;
}
