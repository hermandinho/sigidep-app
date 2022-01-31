import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeProcedureDTO {
  public id?: number;

  @ApiProperty({ example: 'PROC1', required: true })
  @IsNotEmpty()
  public code: string;

  @ApiProperty({ example: 'PROCEDURE1', required: true })
  public label: string;
}
