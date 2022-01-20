import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategorieAgentsDTO {
  public id?: number;
  @ApiProperty({ example: 'A1', required: true })
  @IsNotEmpty()
  public code: string;

  @ApiProperty({ example: 'A1', required: false })
  public description?: string;
}
