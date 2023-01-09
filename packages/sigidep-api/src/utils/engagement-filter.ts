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
  @Transform((value: string) => (value !== '' ? value.split(',') : undefined))
  numeros?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform((value: string) => (value !== '' ? value.split(',') : undefined))
  imputation?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform((value: string) => (value !== '' ? value.split(',') : undefined))
  ids?: number[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform((value: string) => (value !== '' ? value.split(',') : undefined))
  exercices?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform((value: string) => (value !== '' ? value.split(',') : undefined))
  objets?: string[];
}
