import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Secrétaire',
    required: true,
  })
  @IsNotEmpty()
  public label: string;

  @ApiProperty({
    example: 'Secrétaire',
    required: false,
  })
  @IsNotEmpty()
  public description: string;
}
