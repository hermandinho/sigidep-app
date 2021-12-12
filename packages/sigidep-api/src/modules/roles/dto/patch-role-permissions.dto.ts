import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PatchRolePermissionsDto {
  @ApiProperty({
    example: [1, 2, 3, 4],
    required: true,
    type: 'number',
    isArray: true,
  })
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  public ids: number[];
}
