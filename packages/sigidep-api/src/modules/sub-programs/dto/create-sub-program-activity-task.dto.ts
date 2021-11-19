import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubProgramActivityTaskDto {
  @ApiProperty({ example: '22', required: true })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  public code: string;

  @ApiProperty({ example: 'Super tâche', required: true })
  @IsNotEmpty()
  public labelFr: string;

  @ApiProperty({ example: 'Super task', required: true })
  @IsNotEmpty()
  public labelEn: string;

  @ApiProperty({
    example: 'Super présentation',
    required: true,
    description: 'Parties Prenantes',
  })
  @IsNotEmpty()
  public stakeHoldersFr: string;

  @ApiProperty({
    example: 'Great presentation',
    required: true,
    description: 'Parties Prenantes',
  })
  @IsNotEmpty()
  public stakeHoldersEn: string;

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

  @ApiProperty({ example: 1290000000, required: false })
  @IsNumberString()
  public engagementAuthorization?: number;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  public isMultiYear: boolean;
}
