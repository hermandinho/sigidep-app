import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from '../../../entities/role.entity';

export class UserDTO {
  public id?: number;

  @ApiProperty({ example: 'Admin', required: true })
  public firstName: string;

  @ApiProperty({ example: 'admin1', required: true })
  public lastName: string;

  @ApiProperty({ example: 'admin', required: true })
  public userName: string;

  @ApiProperty({ example: '123456', required: true })
  public password: string;

  @ApiProperty({ example: '', required: false })
  public profile_picture: string;

  @ApiProperty({ example: '10', required: false })
  public salt: string;

  @ApiProperty({ example: 'ADMIN', required: false })
  public role: RoleEntity;

  @ApiProperty({ example: 'active', required: false })
  public status: string;

  @ApiProperty({ example: 'admin@gmail.com', required: false })
  public email: string;
}
