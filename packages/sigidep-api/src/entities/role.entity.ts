import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from '@entities/user.entity';
import { RolePermissionEntity } from '@entities/role-permission.entity';

@Entity({
  name: 'roles',
})
export class RoleEntity extends BaseEntity {
  @Column({ name: 'label', nullable: false })
  public label: string;

  @Column({ name: 'description', nullable: true })
  public description!: string;

  public permissionKeys: string[];

  // RELATIONS
  @OneToMany(() => UserEntity, (object) => object.role, { eager: false })
  public users: UserEntity[] | Partial<UserEntity>[];

  @OneToMany(() => RolePermissionEntity, (object) => object.role, {
    eager: true,
  })
  public permissions: RolePermissionEntity[];

  @ManyToOne(() => UserEntity, (object) => object.id, {
    eager: false,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  public createdBy: UserEntity;

  constructor(params?: Partial<RoleEntity>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }

  @AfterLoad()
  public afterLoad() {
    if (this.permissions) {
      this.permissionKeys = this.permissions.map(
        (permission) => permission.permission && permission.permission.label,
      );
    }
  }
}
