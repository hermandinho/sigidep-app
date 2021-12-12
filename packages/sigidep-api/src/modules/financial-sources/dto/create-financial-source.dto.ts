import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFinancialSourceDto {
  @ApiProperty({ example: '01', required: true })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  public code: string;

  @ApiProperty({ example: 'Budget de fonctionnement', required: true })
  @IsNotEmpty()
  public labelFr: string;

  @ApiProperty({ example: 'Operating budget', required: true })
  @IsNotEmpty()
  public labelEn: string;

  @ApiProperty({ example: 'BF', required: true })
  @IsNotEmpty()
  public abbreviationFr: string;

  @ApiProperty({ example: 'OB', required: true })
  @IsNotEmpty()
  public abbreviationEn: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  public acceptsDeliverables: boolean;
}
