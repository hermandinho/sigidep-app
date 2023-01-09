import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPassWordDto {
  @ApiProperty()
  @IsNotEmpty()
  public email: string;
}
