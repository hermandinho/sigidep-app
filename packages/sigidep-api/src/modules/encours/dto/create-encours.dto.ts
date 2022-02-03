import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEncoursDTO {
  @ApiProperty({ example: '55', required: true })
  @IsNotEmpty()
  public exercise: number;

  @ApiProperty({ example: '10', required: true })
  public valeurSeuil: number;
}
