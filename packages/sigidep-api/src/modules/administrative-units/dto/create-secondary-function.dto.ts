import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePrimaryFunctionDto } from '@modules/administrative-units/dto/create-primary-function.dto';

export class CreateSecondaryFunctionDto extends CreatePrimaryFunctionDto {
  @ApiProperty({ example: '333', required: true })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(3)
  public code: string;

  @ApiProperty({ example: 1, required: true })
  @IsNotEmpty()
  public parentId: number;
}
