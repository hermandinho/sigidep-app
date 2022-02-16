import { CreateTypeProcedureDTO } from '@modules/types-procedures/dto/create-type-procedure.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateExecProcedureDTO {
  id?: number;

  @ApiProperty({
    type: () => CreateTypeProcedureDTO,
    nullable: true,
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  typeProcedure: CreateTypeProcedureDTO;

  @ApiProperty({ example: 'CM000256', required: true })
  matriculeAgent: string;

  @ApiProperty({ example: 'Tamo', required: true })
  nomAgent: string;

  @ApiProperty({ example: '1256485', required: true })
  numContribuable: string;

  @ApiProperty({ example: 'TOKO', required: true })
  nomContribuable: string;

  @ApiProperty({ type: 'float', example: '1000.52', required: true })
  TxTVA: number;

  @ApiProperty({ type: 'float', example: '100.55', required: true })
  TxIR: number;

  @ApiProperty({ example: 'RIB', required: true })
  RIB: string;
}
