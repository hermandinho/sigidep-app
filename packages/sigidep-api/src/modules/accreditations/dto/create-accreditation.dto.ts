import { GestionnairesEntity } from './../../../entities/gestionnaire.entity';

import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccreditationDto {
  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  /*   @MinLength(5)
  @MaxLength(5) */
  public imputation: string;

  @ApiProperty({ example: 'Tamo', required: true })
  @IsNotEmpty()
  public labelOperation: string;

  @ApiProperty({ example: '20/09/2022', required: true })
  @IsNotEmpty()
  public dateDebut: Date;

  @ApiProperty({ example: '20/09/2022', required: true })
  @IsNotEmpty()
  public dateFin: Date;

  @ApiProperty({ example: '2', required: true })
  @IsNotEmpty()
  public gestionnaire: GestionnairesEntity;
}
