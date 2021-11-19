import {
  IsDateString,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubProgramActivityDto {
  @ApiProperty({ example: '22', required: true })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  public code: string;

  @ApiProperty({ example: 'Super activité', required: true })
  @IsNotEmpty()
  public labelFr: string;

  @ApiProperty({ example: 'Super activity', required: true })
  @IsNotEmpty()
  public labelEn: string;

  @ApiProperty({ example: 'Super présentation', required: true })
  @IsNotEmpty()
  public presentationFr: string;

  @ApiProperty({ example: 'Great presentation', required: true })
  @IsNotEmpty()
  public presentationEn: string;

  @ApiProperty({ example: 'Super Objectif', required: true })
  @IsNotEmpty()
  public objectivesFr: string;

  @ApiProperty({ example: 'Great objectives', required: true })
  @IsNotEmpty()
  public objectivesEn: string;

  @ApiProperty({ example: 'Super resultats', required: true })
  @IsNotEmpty()
  public resultsFr: string;

  @ApiProperty({ example: 'Great results', required: true })
  @IsNotEmpty()
  public resultsEn: string;

  @ApiProperty({ example: 'Super indicateurs', required: true })
  @IsNotEmpty()
  public indicatorsFr: string;

  @ApiProperty({ example: 'Great indicators', required: true })
  @IsNotEmpty()
  public indicatorsEn: string;

  @ApiProperty({ example: 'Super source de verification', required: true })
  @IsNotEmpty()
  public verificationSourceFr: string;

  @ApiProperty({ example: 'Great verificationSource', required: true })
  @IsNotEmpty()
  public verificationSourceEn: string;

  @ApiProperty({ example: 199999, required: true })
  @IsNotEmpty()
  public referenceValue: number;

  @ApiProperty({ example: new Date().toISOString(), required: true })
  @IsNotEmpty()
  @IsDateString()
  public referenceYear: Date;

  @ApiProperty({ example: 90000, required: true })
  @IsNotEmpty()
  public targetValue: number;

  @ApiProperty({ example: new Date().toISOString(), required: true })
  @IsNotEmpty()
  @IsDateString()
  public targetYear: Date;

  @ApiProperty({ example: '%', required: true })
  @IsNotEmpty()
  public measurementUnit: string;

  @ApiProperty({ example: new Date().toISOString(), required: true })
  @IsDateString()
  public startDate: Date;

  @ApiProperty({ example: new Date().toISOString(), required: true })
  @IsDateString()
  public endDate: Date;
}
