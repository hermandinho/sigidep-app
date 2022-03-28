import { CreateExecTaxesDTO } from '@modules/exec-taxes/dto/create-exec-taxes.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateEngagementJuridiqueDTO } from './create-engagement-juridique.dto';

export class EngagementCommandeDTO extends CreateEngagementJuridiqueDTO {
  @ApiProperty({ example: '12258552', required: false })
  public niuContribuable: string;

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

  @ApiProperty({
    type: () => CreateExecTaxesDTO,
    nullable: true,
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  public taxesApplicable: CreateExecTaxesDTO;
}
