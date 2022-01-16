import { BanksEntity } from './../../../entities/bank.entity';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAgenceDto {
  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(5)
  public code: string;

  @ApiProperty({ example: 'Agence de Banque CCA', required: true })
  @IsNotEmpty()
  public label: string;

  @ApiProperty({ example: '2', required: true })
  @IsNotEmpty()
  public bank: BanksEntity;
}
