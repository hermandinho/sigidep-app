import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReferencePhysicalUnitDto {
  @ApiProperty({ example: 'Test FR', required: true })
  @IsNotEmpty()
  public labelFr: string;

  @ApiProperty({ example: 'TEST EN', required: true })
  @IsNotEmpty()
  public labelEn: string;

  @ApiProperty({ example: 1, required: true })
  @IsNotEmpty()
  public paragraphId: number;
}
