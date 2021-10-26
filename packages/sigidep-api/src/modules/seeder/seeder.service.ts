import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '@entities/role.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { PERMISSIONS_DATA, ROOT_ROLE, ROOT_USER } from '@modules/seeder/data';
import { PermissionEntity } from '@entities/permission.entity';
import { RolePermissionEntity } from '@entities/role-permission.entity';

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger(SeederService.name);
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionsRepository: Repository<PermissionEntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionsRepository: Repository<RolePermissionEntity>,
  ) {}

  private async _initRoot(): Promise<{ role: RoleEntity; user: UserEntity }> {
    let role = await this.rolesRepository.findOne(
      {
        label: ROOT_ROLE.label,
      },
      { loadEagerRelations: false },
    );

    if (!role) {
      this.logger.warn('Setting up root role ....');
      role = await this.rolesRepository.save(ROOT_ROLE);
    }

    const rootUser = await this.usersRepository.findOne(
      {
        role,
      },
      {
        loadEagerRelations: false,
      },
    );

    if (!rootUser) {
      this.logger.warn('Setting up root user ....');
      const user = new UserEntity();
      Object.assign(user, ROOT_USER);
      user.password = await user.hashPassword();
      user.role = role;

      await this.usersRepository.save(user);
    }
    return { user: rootUser, role };
  }

  private async _initPermissions(role: RoleEntity) {
    const permissions = await this.permissionsRepository
      .createQueryBuilder('p')
      .getMany();

    const existingPermissions = permissions.map((p) => p.label);

    const keys = PERMISSIONS_DATA.map((p) => p.label);

    const newPermissions = keys
      .filter((p) => !existingPermissions.includes(p))
      .map((p) => PERMISSIONS_DATA.find((item) => item.label === p));

    const rootPermissions: RolePermissionEntity[] = [];
    let count = 0;
    if (newPermissions?.length) {
      for (const p of newPermissions) {
        const permission = await this.permissionsRepository.save(p);
        rootPermissions.push(
          new RolePermissionEntity({
            role,
            permission,
          }),
        );
        count += 1;
      }
    }

    if (rootPermissions?.length) {
      await this.rolePermissionsRepository.insert(rootPermissions);
    }

    this.logger.warn(
      `${count} new permissions creted and assigned to root user`,
    );
  }

  async onModuleInit(): Promise<any> {
    const { role } = await this._initRoot();
    this._initPermissions(role);
  }
}
