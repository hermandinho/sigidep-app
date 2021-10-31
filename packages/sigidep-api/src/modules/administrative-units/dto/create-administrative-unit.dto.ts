import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdministrativeUnitDto {
  @ApiProperty({ example: '221122', required: true })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  public code: string;

  @ApiProperty({ example: 'Unité de test', required: true })
  @IsNotEmpty()
  public labelFr: string;

  @ApiProperty({ example: 'Testing Unit', required: true })
  @IsNotEmpty()
  public labelEn: string;

  @ApiProperty({ example: 'UT', required: true })
  @IsNotEmpty()
  public abbreviationFr: string;

  @ApiProperty({ example: 'TU', required: true })
  @IsNotEmpty()
  public abbreviationEn: string;

  @ApiProperty({ example: 1, required: true })
  @IsNotEmpty()
  public categoryId: number;

  @ApiProperty({ example: 1, required: true })
  @IsNotEmpty()
  public regionId: number;

  @ApiProperty({ example: 1, required: true })
  @IsNotEmpty()
  public sectorId: number;

  @ApiProperty({ example: 1, required: true })
  @IsNotEmpty()
  public secondaryFunctionId: number;
}
