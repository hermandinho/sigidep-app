import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrimaryFunctionDto {
  @ApiProperty({ example: '221122', required: true })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  public code: string;

  @ApiProperty({ example: 'Super fonction', required: true })
  @IsNotEmpty()
  public labelFr: string;

  @ApiProperty({ example: 'Great function', required: true })
  @IsNotEmpty()
  public labelEn: string;
}
