import { ApiProperty } from '@nestjs/swagger';

export class CreateExecTaxesDTO {
  id?: number;
  @ApiProperty({ example: 'TXA1', required: true })
  code: string;

  @ApiProperty({ example: 'TAXE', required: true })
  label: string;

  @ApiProperty({ type: 'float', example: '15.56', required: true })
  TxTVA: number;

  @ApiProperty({ type: 'float', example: '55.56', required: true })
  TxIR: number;
}
