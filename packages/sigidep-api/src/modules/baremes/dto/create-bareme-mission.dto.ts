import { ApiProperty } from '@nestjs/swagger';

export class CreateBaremeMissionDTO {
  public id?: number;

  @ApiProperty({ example: '1000', required: true })
  public montant: number;
}
