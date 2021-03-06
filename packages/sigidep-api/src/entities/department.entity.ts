import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RegionEntity } from './region.entity';
import { ArrondissementEntity } from './arrondissement.entity';

@Entity({
  name: 'departments',
  orderBy: {
    code: 'ASC',
  },
})
export class DepartmentEntity extends BaseEntity {
  @Column({ name: 'code', nullable: true })
  public code?: string;

  @Column({ name: 'label_fr', nullable: false })
  public labelFr: string;

  @Column({ name: 'label_en', nullable: false })
  public labelEn: string;

  @ManyToOne(() => RegionEntity, (object) => object.departments, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'region_id' })
  public region?: RegionEntity;

  @OneToMany(() => ArrondissementEntity, (object) => object.department, {
    eager: true,
    cascade: ['insert'],
  })
  public arrondissements?: Partial<ArrondissementEntity>[];
}
