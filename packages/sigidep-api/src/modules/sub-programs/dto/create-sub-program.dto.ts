/*
 * Built with ❣️ by El Manifico
 *
 * Email: hdemsongtsamo@gmail.com
 * Date: 12/11/21, 1:28 PM
 */

import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class Identification {
  @ApiProperty({ required: false })
  @IsOptional()
  public id?: number;

  @ApiProperty({ example: '22', required: true })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  public code: string;

  @ApiProperty({ example: 'Super sous program', required: true })
  @IsNotEmpty()
  public labelFr: string;

  @ApiProperty({ example: 'Super sous program', required: true })
  @IsNotEmpty()
  public labelEn: string;

  @ApiProperty({ example: 'John Doe', required: true })
  @IsNotEmpty()
  public coordinator: string;

  @ApiProperty({ example: 'John Doe', required: true })
  @IsNotEmpty()
  public owner: string;

  @ApiProperty({ example: 'Jack Daniel', required: true })
  @IsNotEmpty()
  public followUpOwner: string;

  @ApiProperty({ example: 'Super présentation', required: true })
  @IsNotEmpty()
  public presentationFr: string;

  @ApiProperty({ example: 'Great presentation', required: true })
  @IsNotEmpty()
  public presentationEn: string;

  @ApiProperty({ example: new Date().toISOString(), required: true })
  @IsDateString()
  public startDate: Date;

  @ApiProperty({ example: new Date().toISOString(), required: true })
  @IsDateString()
  public endDate: Date;
}

class Objective {
  @ApiProperty({ required: false })
  @IsOptional()
  public id?: number;

  @ApiProperty({ example: 'Super objectif', required: true })
  @IsNotEmpty()
  public labelFr: string;

  @ApiProperty({ example: 'Super objective', required: true })
  @IsNotEmpty()
  public labelEn: string;

  @ApiProperty({ example: 'Super objective', required: true })
  @IsNotEmpty()
  @Type(() => ObjectiveIndicator)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  public indicators: ObjectiveIndicator[];
}

class ObjectiveIndicator {
  @ApiProperty({ required: false })
  @IsOptional()
  public id?: number;

  @ApiProperty({ example: 'Super objectif', required: true })
  @IsNotEmpty()
  public labelFr: string;

  @ApiProperty({ example: 'Super objective', required: true })
  @IsNotEmpty()
  public labelEn: string;

  @ApiProperty({ example: 199999, required: true })
  @IsNotEmpty()
  public referenceValue: number;

  @ApiProperty({ example: 2020, required: true })
  @IsNotEmpty()
  public referenceYear: number;

  @ApiProperty({ example: 999999, required: true })
  @IsNotEmpty()
  public targetValue: number;

  @ApiProperty({ example: 2025, required: true })
  @IsNotEmpty()
  public targetYear: number;

  @ApiProperty({ example: '%', required: true })
  @IsNotEmpty()
  public measurementUnit: string;

  @ApiProperty({ example: 'Verification', required: true })
  @IsNotEmpty()
  public verificationSourceFr: string;

  @ApiProperty({ example: 'Verification', required: true })
  @IsNotEmpty()
  public verificationSourceEn: string;
}

class ObjectiveStrategy {
  @ApiProperty({ example: 'Super objectif', required: true })
  @IsNotEmpty()
  public strategyFr: string;

  @ApiProperty({ example: 'Super objective', required: true })
  @IsNotEmpty()
  public strategyEn: string;
}

export class CreateSubProgramDto {
  @ApiProperty({ example: 1, required: true })
  @IsNotEmpty()
  public exerciseId: number;

  @ApiProperty({ example: 1, required: true })
  @IsNotEmpty()
  public structureId: number;

  @ApiProperty({ example: '22', required: true })
  @IsNotEmpty()
  @IsDefined()
  @Type(() => Identification)
  @ValidateNested()
  public identification: Identification;

  @ApiProperty({ example: '22', required: true })
  @IsNotEmpty()
  @IsArray()
  @IsDefined()
  @Type(() => Objective)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  public objectives: Objective[];

  @ApiProperty({ example: '22', required: true })
  @IsNotEmpty()
  @IsDefined()
  @Type(() => ObjectiveStrategy)
  @ValidateNested()
  public strategies: ObjectiveStrategy;
}
