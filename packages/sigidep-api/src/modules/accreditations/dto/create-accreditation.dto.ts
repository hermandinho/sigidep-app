import { GestionnairesEntity } from './../../../entities/gestionnaire.entity';

import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EncoursEntity } from '@entities/encours.entity';

export class CreateAccreditationDto {
  @ApiProperty({ example: '{}', required: true })
  @IsNotEmpty()
  /*   @MinLength(5)
  @MaxLength(5) */
  public imputations: [
    {
      startDate: Date;
      endDate: Date;
      element: EncoursEntity;
    },
  ];
  // @IsNotEmpty()
  // public startDate: Date;

  // @IsNotEmpty()
  // public endDate: Date;

  // @IsNotEmpty()
  // public tache: string;

  // @IsNotEmpty()
  // public operation: string;
  @ApiProperty({ example: '2', required: true })
  @IsNotEmpty()
  public gestionnaire: GestionnairesEntity;
}
