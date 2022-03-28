import { CreateExecTaxesDTO } from '@modules/exec-taxes/dto/create-exec-taxes.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateEngagementJuridiqueDTO } from './create-engagement-juridique.dto';

export class EngagementDecisionDTO extends CreateEngagementJuridiqueDTO {
  @ApiProperty({ example: '1100011', required: false })
  public matriculeBeneficiaire: string;

  @ApiProperty({ example: 'JEAN LUC', required: false })
  public nomBeneficiaire: string;

  @ApiProperty({ example: '0200', required: false })
  public numContribBudget: string;

  @ApiProperty({ example: 'JEAN LUC', required: false })
  public nomContribBudget: string;

  @ApiProperty({ example: '0200000', required: false })
  public codeUnitAdminBenef: string;

  @ApiProperty({ example: 'CCA', required: false })
  nomUnitAdminBenef: string;

  @ApiProperty({ example: '2000', required: false })
  public montantBrut: number;

  @ApiProperty({ example: '2000', required: false })
  public montantIRNC: number;

  @ApiProperty({ example: 'CCA', required: false })
  public raisonSociale: string;

  @ApiProperty({ example: '10000', required: false })
  public codeBanqueContribuable: string;

  @ApiProperty({ example: '12000', required: false })
  public codeAgenceContribuable: string;

  @ApiProperty({ example: '0000015', required: false })
  public numeroCompteContribuable: string;

  @ApiProperty({ example: '10', required: false })
  public cleCompteContribuable: string;

  @ApiProperty({ example: '19.86', required: false })
  public tauxTVA: number;

  @ApiProperty({ example: '2.2', required: false })
  public tauxIR: number;

  @ApiProperty({ example: '2000000', required: false })
  public netAPercevoir: number;

  @ApiProperty({
    type: () => CreateExecTaxesDTO,
    nullable: true,
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  public taxesApplicable: CreateExecTaxesDTO;
}
