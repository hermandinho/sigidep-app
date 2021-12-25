import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DepartmentEntity } from './department.entity';

@Entity({
  name: 'arrondissements',
  orderBy: {
    code: 'ASC',
  },
})
export class ArrondissementEntity extends BaseEntity {
  @Column({ name: 'code', nullable: true })
  public code?: string;

  @Column({ name: 'label_fr', nullable: false })
  public labelFr: string;

  @Column({ name: 'label_en', nullable: false })
  public labelEn: string;

  @Column({ name: 'chief_town', nullable: true })
  public chiefTown?: string;

  @ManyToOne(() => DepartmentEntity, (object) => object.arrondissements, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id' })
  public department: DepartmentEntity;
}
