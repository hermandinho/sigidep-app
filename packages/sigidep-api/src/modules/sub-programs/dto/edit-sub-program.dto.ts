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
  IsOptional,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class Identification {
  @ApiProperty({ required: false })
  @IsOptional()
  public id?: number;

  @ApiProperty({ example: '22', required: false })
  @IsOptional()
  @ValidateIf((o) => !!o.code)
  @MinLength(2)
  @MaxLength(2)
  public code?: string;

  @ApiProperty({ example: 'Super sous program', required: false })
  @IsOptional()
  public labelFr?: string;

  @ApiProperty({ example: 'Super sous program', required: false })
  @IsOptional()
  public labelEn?: string;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  public coordinator?: string;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  public owner?: string;

  @ApiProperty({ example: 'Jack Daniel', required: false })
  @IsOptional()
  public followUpOwner?: string;

  @ApiProperty({ example: 'Super présentation', required: false })
  @IsOptional()
  public presentationFr?: string;

  @ApiProperty({ example: 'Great presentation', required: false })
  @IsOptional()
  public presentationEn?: string;

  @ApiProperty({ example: new Date().toISOString(), required: false })
  @IsOptional()
  @IsDateString()
  public startDate?: Date;

  @ApiProperty({ example: new Date().toISOString(), required: false })
  @IsOptional()
  @IsDateString()
  public endDate: Date;
}

class Objective {
  @ApiProperty({ required: false })
  @IsOptional()
  public id?: number;

  @ApiProperty({ example: 'Super objectif', required: false })
  @IsOptional()
  public labelFr?: string;

  @ApiProperty({ example: 'Super objective', required: false })
  @IsOptional()
  public labelEn?: string;

  @ApiProperty({ example: 'Super objective', required: false })
  @IsOptional()
  @ValidateIf((o) => !!o.indicators)
  @Type(() => ObjectiveIndicator)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  public indicators?: ObjectiveIndicator[];
}

class ObjectiveIndicator {
  @ApiProperty({ required: false })
  @IsOptional()
  public id?: number;

  @ApiProperty({ example: 'Super objectif', required: false })
  @IsOptional()
  public labelFr?: string;

  @ApiProperty({ example: 'Super objective', required: false })
  @IsOptional()
  public labelEn?: string;

  @ApiProperty({ example: 199999, required: false })
  @IsOptional()
  public referenceValue?: number;

  @ApiProperty({ example: 2020, required: false })
  @IsOptional()
  public referenceYear?: number;

  @ApiProperty({ example: 999999, required: false })
  @IsOptional()
  public targetValue?: number;

  @ApiProperty({ example: 2025, required: false })
  @IsOptional()
  public targetYear: number;

  @ApiProperty({ example: '%', required: false })
  @IsOptional()
  public measurementUnit?: string;

  @ApiProperty({ example: 'Verification', required: false })
  @IsOptional()
  public verificationSourceFr?: string;

  @ApiProperty({ example: 'Verification', required: false })
  @IsOptional()
  public verificationSourceEn: string;
}

class ObjectiveStrategy {
  @ApiProperty({ example: 'Super objectif', required: false })
  @IsOptional()
  public strategyFr?: string;

  @ApiProperty({ example: 'Super objective', required: false })
  @IsOptional()
  public strategyEn?: string;
}

export class EditSubProgramDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  public exerciseId?: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  public structureId?: number;

  @ApiProperty({ example: '22', required: false })
  @IsOptional()
  @ValidateIf((o) => !!o.identification)
  @Type(() => Identification)
  @ValidateNested()
  public identification?: Identification;

  @ApiProperty({ example: '22', required: false })
  @IsOptional()
  @ValidateIf((o) => !!o.objectives)
  @IsArray()
  @Type(() => Objective)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  public objectives?: Objective[];

  @ApiProperty({ example: '22', required: false })
  @IsOptional()
  @ValidateIf((o) => !!o.strategies)
  @IsDefined()
  @Type(() => ObjectiveStrategy)
  @ValidateNested()
  public strategies?: ObjectiveStrategy;
}
