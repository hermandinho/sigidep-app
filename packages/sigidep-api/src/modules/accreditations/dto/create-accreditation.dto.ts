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

  // @ApiProperty({ example: 'Tamo', required: true })
  // @IsNotEmpty()
  // public labelOperation: string;

  // @ApiProperty({ example: '20/09/2022', required: true })
  // @IsNotEmpty()
  // public startDate: Date;

  // @ApiProperty({ example: '20/09/2022', required: true })
  // @IsNotEmpty()
  // public endDate: Date;

  @ApiProperty({ example: '2', required: true })
  @IsNotEmpty()
  public gestionnaire: GestionnairesEntity;
}
