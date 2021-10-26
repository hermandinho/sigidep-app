import { BaseEntity } from '@entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { PermissionContextsEnum } from '@utils/constants';
import { RolePermissionEntity } from '@entities/role-permission.entity';

@Entity({
  name: 'permissions',
})
export class PermissionEntity extends BaseEntity {
  @Column({ name: 'label', nullable: false })
  public label: string;

  @Column({ name: 'description', nullable: true })
  public description!: string;

  @Column({
    name: 'context',
    nullable: false,
    type: 'enum',
    enum: PermissionContextsEnum,
    default: PermissionContextsEnum.DEFAULT,
  })
  public context: PermissionContextsEnum;

  // RELATIONS
  @OneToMany(() => UserEntity, (object) => object.role, { eager: false })
  public users: UserEntity[];

  @OneToMany(() => RolePermissionEntity, (object) => object.permission, {
    eager: false,
  })
  public roles: RolePermissionEntity[];
}
