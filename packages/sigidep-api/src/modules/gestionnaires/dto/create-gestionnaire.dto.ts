import { AgentEntity } from '@entities/agent.entity';

import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGestionnaireDto {
  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  /*   @MinLength(5)
  @MaxLength(5) */
  public matricule: string;

  @ApiProperty({ example: 'Tamo', required: true })
  @IsNotEmpty()
  public nom: string;

  @ApiProperty({ example: 'Marcel', required: true })
  @IsNotEmpty()
  public prenom: string;

  @ApiProperty({ example: 'Directeur des impots', required: true })
  @IsNotEmpty()
  public fonction: string;

  @ApiProperty({ example: '2', required: true })
  @IsNotEmpty()
  public agent: AgentEntity;
}
