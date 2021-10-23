import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DepartmentEntity } from './department.entity';

@Entity({
  name: 'arrondissements',
  orderBy: {
    code: 'ASC',
    label: 'ASC',
  },
})
export class ArrondissementEntity extends BaseEntity {
  @Column({ name: 'code', nullable: true })
  public code?: string;

  @Column({ name: 'label', nullable: false })
  public label: string;

  @ManyToOne(() => DepartmentEntity, (object) => object.arrondissements, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id' })
  public region: DepartmentEntity;
}
