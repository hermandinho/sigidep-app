import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBankDto {
  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(5)
  public code: string;

  @ApiProperty({ example: 'Banque CCA', required: true })
  @IsNotEmpty()
  public label: string;
}
