import { TypeMissionEnum } from '@entities/engagement-mission.entity';
import { CreateBaremeMissionDTO } from '@modules/baremes/dto/create-bareme-mission.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateEngagementJuridiqueDTO } from './create-engagement-juridique.dto';

export class EngagementMissionDTO extends CreateEngagementJuridiqueDTO {
  @ApiProperty({ type: 'enum', example: 'MISSION_EFFECTUEE', required: false })
  public typeMission: TypeMissionEnum;

  @ApiProperty({ example: 'MAT45216', required: true })
  public matriculeBeneficiaire: string;

  @ApiProperty({ example: 'JEAN TAMO', required: false })
  public nomBeneficiaire: string;

  @ApiProperty({ example: 'BANDJOCK-BANGA', required: false })
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
    type: () => CreateBaremeMissionDTO,
    nullable: true,
    required: false,
  })
  @IsOptional()
  public baremeJour: CreateBaremeMissionDTO;

  @ApiProperty({ type: 'float', example: 5000.782, required: false })
  public montant: number;
}
