import { ApiProperty } from '@nestjs/swagger';
export class CreateEngagementMandatDecissionDTO {
  id?: number;

  @ApiProperty({ example: 'CARNET0001', required: false })
  public numero: string;
 
  @ApiProperty({ type: 'enum', example: 'CANCEL', required: false })
  public etat: string;

  @ApiProperty({ example: '2153-256', required: false })
  public numActeJuridique: string;
}
