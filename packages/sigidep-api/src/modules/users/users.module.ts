import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '@entities/role.entity';
import { PermissionEntity } from '@entities/permission.entity';
import { RolePermissionEntity } from '@entities/role-permission.entity';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      RoleEntity,
      PermissionEntity,
      RolePermissionEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class UsersModule {}
