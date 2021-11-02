import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParagraphDto {
  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
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

  @ApiProperty({ example: 1, required: true })
  @IsNotEmpty()
  public financialSourceId: number;
}
