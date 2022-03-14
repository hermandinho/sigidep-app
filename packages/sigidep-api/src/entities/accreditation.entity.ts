import { GestionnairesEntity } from './gestionnaire.entity';
import { BaseEntity } from '@entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { EncoursEntity } from '.';

@Entity({
  name: 'accreditation',
})
export class AccreditationEntity extends BaseEntity {
  @Column({ name: 'imputations', nullable: false, type: 'jsonb' })
  public imputations: { startDate: Date, endDate: Date, element: EncoursEntity }[];

  // RELATIONS
  @ManyToOne(() => GestionnairesEntity, (object) => object.id, {
    eager: false,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'gestionnaire_id', referencedColumnName: 'id' })
  public gestionnaire: GestionnairesEntity;

  constructor(param?: Partial<AccreditationEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
