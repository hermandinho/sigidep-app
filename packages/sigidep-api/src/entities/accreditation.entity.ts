import { GestionnairesEntity } from './gestionnaire.entity';
import { BaseEntity } from '@entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { EncoursEntity } from '.';

@Entity({
  name: 'accreditation',
})
@Unique('UQ_ACCREDITATION_IMPUTATION', ['imputation'])
export class AccreditationEntity extends BaseEntity {
  @Column({ name: 'imputation', nullable: false })
  public imputation: string;

  @Column({ name: 'labelOperation', nullable: false })
  public labelOperation: string;

  @Column({ name: 'dateDebut', nullable: false })
  public dateDebut: Date;

  @Column({ name: 'dateFin', nullable: false })
  public dateFin: Date;

  // RELATIONS
  @ManyToOne(() => GestionnairesEntity, (object) => object.id, {
    eager: false,
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'gestionnaireId' })
  public gestionnaire: GestionnairesEntity;


  @ManyToOne(() => EncoursEntity, (object)=>object.id, {
    eager: false,
    onDelete: 'CASCADE',
    nullable: false
  })
  @JoinColumn({ name: 'encoursId'})
  public encours: EncoursEntity;

  constructor(param?: Partial<AccreditationEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
