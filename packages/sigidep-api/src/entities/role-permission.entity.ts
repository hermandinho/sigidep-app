import { BaseEntity } from '@entities/base.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RoleEntity } from '@entities/role.entity';
import { PermissionEntity } from '@entities/permission.entity';

@Entity({
  name: 'role_permissions',
})
export class RolePermissionEntity extends BaseEntity {
  // RELATIONS
  @ManyToOne(() => RoleEntity, (object) => object.permissions, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  public role: RoleEntity;

  @ManyToOne(() => PermissionEntity, (object) => object.roles, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'permission_id' })
  public permission: PermissionEntity;

  constructor(params?: Partial<RolePermissionEntity>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
