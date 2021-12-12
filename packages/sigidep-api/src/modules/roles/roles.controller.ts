import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesService } from '@modules/roles/roles.service';
import { UserEntity } from '@entities/user.entity';
import { GetCurrentUser } from '@decorators/get-current-user.decorator';
import { PermissionsGuard } from '@guards/permissions.guard';
import { PatchRolePermissionsDto } from '@modules/roles/dto/patch-role-permissions.dto';
import { CreateRoleDto } from '@modules/roles/dto/create-role.dto';

@Controller('roles')
@ApiTags('Roles')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Get('/')
  @UseGuards(new PermissionsGuard(['roles.read']))
  public async filter(@GetCurrentUser() user: UserEntity) {
    return this.service.filter();
  }

  @Post('/')
  @UseGuards(new PermissionsGuard(['roles.create']))
  public async create(
    @Body(ValidationPipe) payload: CreateRoleDto,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.service.create(payload, user);
  }

  @Patch('/:id/permissions')
  @UseGuards(
    new PermissionsGuard(['roles.create', 'roles.read', 'roles.update']),
  )
  public async patchPermissions(
    @Body(ValidationPipe) payload: PatchRolePermissionsDto,
    @Param('id') id: number,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.service.setPermissions(id, payload.ids);
  }

  @Delete('/:id')
  @UseGuards(new PermissionsGuard(['roles.delete']))
  public async deleteOne(@Param('id') id: number) {
    return this.service.deleteOne(id);
  }
}
