import { ApiProperty } from '@nestjs/swagger';
import { CreateEngagementJuridiqueDTO } from './create-engagement-juridique.dto';

export class EngagementCommandeDTO extends CreateEngagementJuridiqueDTO {
  @ApiProperty({ example: '12258552', required: false })
  public niuContribuable: string;

  @ApiProperty({ type: 'float', example: 15000.56, required: false })
  public montantTTC: number;

  @ApiProperty({ example: 'CCA', required: false })
  public raisonSocialeContribuable: string;

  @ApiProperty({ example: '10000', required: false })
  public codeBanqueContribuable: string;

  @ApiProperty({ example: '12000', required: false })
  public codeAgenceContribuable: string;

  @ApiProperty({ example: '0000015', required: false })
  public numeroCompteContribuable: string;

  @ApiProperty({ example: '10', required: false })
  public cleCompteContribuable: string;
  @ApiProperty({ example: 'REF', required: false })
  public reference: string;

  @ApiProperty({ example: 'OBJ', required: false })
  public objet: string;

  @ApiProperty({ type: 'float', example: 15000.56, required: false })
  public montantTTC: number;
}
