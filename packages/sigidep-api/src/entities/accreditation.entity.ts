import { GestionnairesEntity } from './gestionnaire.entity';
import { BaseEntity } from '@entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { EncoursEntity } from '.';

@Entity({
  name: 'accreditation',
})
export class AccreditationEntity extends BaseEntity {
  @Column({ name: 'start_date', nullable: false, default: new Date() })
  public startDate: Date;

  @Column({ name: 'end_date', nullable: false, default: new Date() })
  public endDate: Date;

  @Column({ name: 'imputation', nullable: false, default: 'default value' })
  public imputation: string;

  @Column({ name: 'tache', nullable: false, default: 'default value' })
  public tache: string;

  @Column({ name: 'operation', nullable: true, default: 'default value' })
  public operation: string;

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
