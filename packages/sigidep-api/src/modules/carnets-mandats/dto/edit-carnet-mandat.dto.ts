import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EditAgentDTO } from '@modules/agents/dto/edit-Agent.dto';

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

  /** TO BE CHANGED TO Fournisseur entity later, at least a fournisseur is an agent */
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
  public numCNIAgentRetrait: string;

  @ApiProperty({
    example: new Date().toISOString(),
    nullable: true,
    required: false,
  })
  public dateDelivranceCNI: Date | string;

  @ApiProperty({ example: '', required: false })
  public lieuDelivranceCNI: string;
}
