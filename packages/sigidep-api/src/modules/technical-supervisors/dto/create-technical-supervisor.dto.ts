import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTechnicalSupervisorDto {
  @ApiProperty({ example: '01', required: true })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  public code: string;

  @ApiProperty({ example: 'Technique', required: true })
  @IsNotEmpty()
  public labelFr: string;

  @ApiProperty({ example: 'Technical', required: true })
  @IsNotEmpty()
  public labelEn: string;

  @ApiProperty({ example: 'TI', required: true })
  @IsNotEmpty()
  public abbreviationFr: string;

  @ApiProperty({ example: 'TT', required: true })
  @IsNotEmpty()
  public abbreviationEn: string;
}
