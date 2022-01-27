import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBaremeMissionDTO {
  public id?: number;

  @ApiProperty({ example: 'BAR1', required: true })
  @IsNotEmpty()
  public code: string;

  @ApiProperty({ example: '1000', required: true })
  public montant: number;
}
