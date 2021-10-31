import { BaseEntity } from '@entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { AdministrativeUnitEntity } from '@entities/administrative-unit.entity';

@Entity({
  name: 'categories',
})
@Unique('UQ_CATEGORY_CODE', ['code'])
export class CategoriesEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label', nullable: false })
  public label: string;

  // RELATIONS

  @OneToMany(() => AdministrativeUnitEntity, (object) => object.sector, {})
  public administrativeUnits: AdministrativeUnitEntity[];

  @ManyToOne(() => UserEntity, (object) => object.id, {
    eager: false,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  public createdBy: UserEntity;

  constructor(param?: Partial<CategoriesEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
