import { ExerciseEntity } from '@entities/exercise.entity';
import { AgencesEntity } from './../../../entities/agence.entity';

import { BanksEntity } from './../../../entities/bank.entity';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContribuablesBudgetaireDto {
  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(5)
  public code: string;

  @ApiProperty({ example: 'un raison socile', required: true })
  @IsNotEmpty()
  public raisonSociale: string;

  @ApiProperty({ example: '0011766711111', required: true })
  @IsNotEmpty()
  public numeroCompte: string;

  @ApiProperty({ example: '00', required: true })
  @IsNotEmpty()
  public cle: string;

  @ApiProperty({ example: '2', required: true })
  @IsNotEmpty()
  public banque: BanksEntity;

  @ApiProperty({ example: '2', required: true })
  @IsNotEmpty()
  public agence: AgencesEntity;

  @ApiProperty({ example: '2', required: true })
  @IsNotEmpty()
  public exercice: ExerciseEntity;
}
