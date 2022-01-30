import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePieceJointeDTO {
  public id?: number;

  @ApiProperty({ example: 'PC1', required: true })
  @IsNotEmpty()
  public code: string;

  @ApiProperty({ example: '1', required: true })
  public order: number;

  @ApiProperty({ example: 'PIECE1', required: true })
  public label: string;
}
