import { AccreditationEntity } from './accreditation.entity';
import { AgentEntity } from '@entities/agent.entity';
import { BaseEntity } from '@entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  Unique,
  OneToMany,
} from 'typeorm';

@Entity({
  name: 'gestionnaires',
})
@Unique('UQ_GESTIONNAIRE_MATRICULE', ['matricule'])
export class GestionnairesEntity extends BaseEntity {
  @Column({ name: 'matricule', nullable: false })
  public matricule: string;

  @Column({ name: 'nom', nullable: false })
  public nom: string;

  @Column({ name: 'prenom', nullable: false })
  public prenom: string;

  @Column({ name: 'fonction', nullable: false })
  public fonction: string;

  // RELATIONS
  @OneToOne(() => AgentEntity, (object) => object.id, {
    eager: false,
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'agentId' })
  public agent: AgentEntity;

  @OneToMany(() => AccreditationEntity, (object) => object.gestionnaire, {})
  public accreditations: AccreditationEntity[];

  constructor(param?: Partial<GestionnairesEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
