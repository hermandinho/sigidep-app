import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DepartmentEntity } from './department.entity';

@Entity({
  name: 'regions',
  orderBy: {
    code: 'ASC',
    label: 'ASC',
  },
})
export class RegionEntity extends BaseEntity {
  @Column({ name: 'code', nullable: true })
  public code: string;

  @Column({ name: 'label', nullable: false })
  public label: string;

  @OneToMany(() => DepartmentEntity, (object) => object.region, {
    eager: true,
  })
  public departments: DepartmentEntity[];
}
