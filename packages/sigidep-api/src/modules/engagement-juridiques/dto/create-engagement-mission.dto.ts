import { CreateBaremeMissionDTO } from '@modules/baremes/dto/create-bareme-mission.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateEngagementJuridiqueDTO } from './create-engagement-juridique.dto';

export class EngagementMissionDTO extends CreateEngagementJuridiqueDTO {
  @ApiProperty({ example: '002545', required: false })
  public numeroOM: string;

  @ApiProperty({ example: 'type1', required: false })
  public type: string;

  @ApiProperty({ example: 'MAT45216', required: false })
  public matriculeBeneficiaire: string;

  @ApiProperty({ example: '689546214652', required: false })
  public omBeneficiaire: string;

  @ApiProperty({ example: 'OBJET', required: false })
  public objet: string;

  @ApiProperty({ example: 'ITENERAIRE', required: false })
  public itineraire: string;

  @ApiProperty({
    type: 'date',
    example: new Date().toISOString(),
    required: false,
  })
  public dateDebut: Date | string;

  @ApiProperty({
    type: 'date',
    example: new Date().toISOString(),
    required: false,
  })
  public dateFin: Date | string;

  @ApiProperty({
    example: 1,
    required: false,
  })
  public nombreJours: number;

  @ApiProperty({
    example: 10,
    required: false,
  })
  public cumulJours: number;

  @ApiProperty({
    type: () => CreateBaremeMissionDTO,
    nullable: true,
    required: false,
  })
  @IsOptional()
  public baremeJour: CreateBaremeMissionDTO;

  @ApiProperty({ type: 'float', example: 5000.782, required: false })
  public montant: number;

  @ApiProperty({ example: false, required: false })
  public chevauchement: boolean;

  @ApiProperty({ example: false, required: false })
  public quotaAtteint: boolean;
}
