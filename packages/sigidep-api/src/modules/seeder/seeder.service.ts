import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '@entities/role.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { ROOT_ROLE, ROOT_USER } from '@modules/seeder/data';

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger(SeederService.name);
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  private async _initRoot(): Promise<void> {
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
  }

  onModuleInit(): any {
    this._initRoot();
  }
}
