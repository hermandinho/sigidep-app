import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'super_user',
    required: true,
    description: 'Email or UserName',
  })
  @IsNotEmpty()
  @MinLength(5)
  public username: string;

  @ApiProperty({ example: 'password', required: true })
  @IsNotEmpty()
  @MinLength(5)
  public password: string;
}
