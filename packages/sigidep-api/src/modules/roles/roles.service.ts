import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '@entities/role.entity';
import { Repository } from 'typeorm';
import { PermissionEntity } from '@entities/permission.entity';
import { RolePermissionEntity } from '@entities/role-permission.entity';
import { CreateRoleDto } from '@modules/roles/dto/create-role.dto';
import { UserEntity } from '@entities/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionsRepository: Repository<PermissionEntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
  ) {}

  public async filter() {
    const roles = await this.roleRepository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.permissions', 'p')
      .leftJoinAndSelect('p.permission', 'pp')
      .where('r.label NOT ILIKE :l', { l: `%root%` })
      .getMany();

    const permissions = await this.permissionsRepository
      .createQueryBuilder('p')
      .getMany();

    return { roles, permissions };
  }

  public async setPermissions(roleId: number, permissions: number[]) {
    const role = await this.roleRepository.findOne(roleId, {
      loadEagerRelations: false,
    });
    if (!role) {
      throw new NotFoundException();
    }

    await this.rolePermissionRepository.delete({
      role,
    });

    await this.rolePermissionRepository.insert(
      permissions.map((id) => {
        return new RolePermissionEntity({
          role,
          permission: new PermissionEntity({ id }),
        });
      }),
    );
    return { status: HttpStatus.OK };
  }

  public async deleteOne(id: number) {
    await this.roleRepository.delete({ id });
    return { status: HttpStatus.OK };
  }

  public async create(payload: CreateRoleDto, user: UserEntity) {
    const check = await this.roleRepository
      .createQueryBuilder('r')
      .where('r.label ILIKE :label', { label: `%${payload.label}%` })
      .getOne();
    if (check) {
      throw new ConflictException();
    }
    return this.roleRepository.save({
      label: payload.label,
      description: payload.description,
      createdBy: user,
    });
  }
}
