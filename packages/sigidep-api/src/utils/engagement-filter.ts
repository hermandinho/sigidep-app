import { Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class EngagementFilter {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform((value: string) => (value !== '' ? value.split(',') : undefined))
  procedures?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform((value: string) => (value !== '' ? value.split(',') : undefined))
  etats?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform((value: string) => (value !== '' ? value: undefined))
  numeros?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform((value: string) => (value !== '' ? value.split(',') : undefined))
  imputation?: string;
}
