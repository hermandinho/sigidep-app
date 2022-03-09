import { GestionnairesEntity } from './gestionnaire.entity';
import { BaseEntity } from '@entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { EncoursEntity } from '.';

@Entity({
  name: 'accreditation',
})
export class AccreditationEntity extends BaseEntity {
  @Column({ name: 'imputations', nullable: false, type: 'jsonb' })
  public imputations: { startDate: Date, endDate: Date, element: EncoursEntity };


  // @Column({ nullable: false })
  // public startDate: Date;

  // @Column({ nullable: false })
  // public endDate: Date;

  // RELATIONS
  @ManyToOne(() => GestionnairesEntity, (object) => object.id, {
    eager: false,
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'gestionnaireId' })
  public gestionnaire: GestionnairesEntity;

  constructor(param?: Partial<AccreditationEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
