import { CreateEngagementJuridiqueDTO } from '@modules/engagement-juridiques/dto/create-engagement-juridique.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class CreateEngagementMandatDecissionDTO {
  id?: number;

  @ApiProperty({ example: 'CARNET0001', required: false })
  public numero: string;
 
  @ApiProperty({ type: 'enum', example: 'CANCEL', required: false })
  public etat: string;

  @ApiProperty({ type: () => CreateEngagementJuridiqueDTO, nullable: true, required: false })
  @IsOptional()
  public numActeJuridique?: CreateEngagementJuridiqueDTO;

/*   @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  public traitement?: any; */

  
}
