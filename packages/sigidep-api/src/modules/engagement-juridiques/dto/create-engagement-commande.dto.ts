import { ApiProperty } from '@nestjs/swagger';
import { CreateEngagementJuridiqueDTO } from './create-engagement-juridique.dto';

export class EngagementCommandeDTO extends CreateEngagementJuridiqueDTO {
  @ApiProperty({ example: 'REF', required: false })
  public reference: string;

  @ApiProperty({ example: 'OBJ', required: false })
  public objet: string;

  @ApiProperty({ type: 'float', example: 15000.56, required: false })
  public montantTTC: number;
}
