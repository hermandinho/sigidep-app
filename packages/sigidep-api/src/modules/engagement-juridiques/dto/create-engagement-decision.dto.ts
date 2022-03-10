import { CreateBaremeMissionDTO } from '@modules/baremes/dto/create-bareme-mission.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateEngagementJuridiqueDTO } from './create-engagement-juridique.dto';

export class EngagementDecisionDTO extends CreateEngagementJuridiqueDTO {
  @ApiProperty({ example: '00001', required: false })
  public numeroOM: string;

  @ApiProperty({ example: 'TYPE1', required: false })
  public type: string;

  @ApiProperty({ example: 'MAT000015', required: false })
  public matriculeBeneficiaire: string;

  @ApiProperty({ example: '695425687', required: false })
  public omBeneficiaire: string;

  @ApiProperty({ example: 'OBJ', required: false })
  public objet: string;

  @ApiProperty({ example: 'ITINERAIRE', required: false })
  public itineraire: string;

  @ApiProperty({ example: new Date().toISOString(), required: false })
  public dateDebut: Date | string;

  @ApiProperty({
    type: 'date',
    example: new Date().toISOString(),
    required: false,
  })
  public dateFin: Date;

  @ApiProperty({ example: 10, required: false })
  public nombreJours: number;

  @ApiProperty({ example: 200, required: false })
  public cumulJours: number;

  @ApiProperty({
    type: () => CreateBaremeMissionDTO,
    nullable: true,
    required: false,
  })
  @IsOptional()
  public baremeJour: CreateBaremeMissionDTO;

  @ApiProperty({ type: 'float', example: 200000.25, required: false })
  public montant: number;

  @ApiProperty({ type: 'boolean', example: false, required: false })
  public chevauchement: boolean;

  @ApiProperty({ type: 'boolean', example: false, required: false })
  public quotaAtteint: boolean;
}
