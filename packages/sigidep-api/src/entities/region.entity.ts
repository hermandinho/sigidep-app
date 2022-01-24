import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DepartmentEntity } from './department.entity';
import { AdministrativeUnitEntity } from '@entities/administrative-unit.entity';

@Entity({
  name: 'regions',
  orderBy: {
    code: 'ASC',
  },
})
export class RegionEntity extends BaseEntity {
  @Column({ name: 'code', nullable: true })
  public code: string;

  @Column({ name: 'label_fr', nullable: false })
  public labelFr: string;

  @Column({ name: 'label_en', nullable: false })
  public labelEn: string;

  // RELATIONS
  @OneToMany(() => AdministrativeUnitEntity, (object) => object.region, {})
  public administrativeUnits: AdministrativeUnitEntity[];

  @OneToMany(() => DepartmentEntity, (object) => object.region, {
    eager: true,
    cascade: ['insert'],
  })
  public departments: Partial<DepartmentEntity>[];

  constructor(params?: Partial<RegionEntity>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
