import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EditAgentDTO } from '@modules/agents/dto/edit-agent.dto';
import { CreateExerciseDto } from '@modules/exercises/dto/create-exercise.dto';

export class EditCarnetMandatDTO {
  public id?: number;

  @ApiProperty({ example: 'CARNET0001', required: true })
  @IsNotEmpty()
  public code: string;

  @ApiProperty({ example: '', required: false })
  public premierFeuillet: string;

  @ApiProperty({ example: '', required: false })
  public dernierFeuillet: string;

  @ApiProperty({
    example: new Date().toISOString(),
    nullable: true,
    required: false,
  })
  @IsDateString()
  @IsOptional()
  public dateEnreg: Date | string;

  /** TO BE CHANGED TO Gestionnaire entity later, at least a Gestionnaire is an agent */
  @ApiProperty({ example: '', required: false })
  public gestionnaire: EditAgentDTO;

  @ApiProperty({
    example: new Date().toISOString(),
    nullable: true,
    required: false,
  })
  public dateAffectation: Date | string;

  @ApiProperty({
    example: new Date().toISOString(),
    nullable: true,
    required: false,
  })
  public dateRetrait: Date | string;

  @ApiProperty({ example: '', required: false })
  public matAgentRetrait: string;

  @ApiProperty({ example: 'MAT0124', required: false })
  public nomAgentRetrait: string;

  @ApiProperty({ example: '', required: false })
  public numCniAgentRetrait: string;

  @ApiProperty({
    example: new Date().toISOString(),
    nullable: true,
    required: false,
  })
  public dateDelivranceCni: Date | string;

  @ApiProperty({ example: '', required: false })
  public lieuDelivranceCni: string;

  @ApiProperty({ example: '', required: false })
  public exercice: CreateExerciseDto;
}
