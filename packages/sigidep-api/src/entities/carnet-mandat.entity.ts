import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { AgentEntity, BaseEntity } from '.';

@Entity({
  name: 'carnets_mandats',
  orderBy: {
    code: 'ASC',
  },
})
@Unique('UQ_CARNET_MANDAT_CODE', ['code'])
export class CarnetMandatEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'premier_feuillet', nullable: true })
  public premierFeuillet: string;

  @Column({ name: 'dernier_feuillet', nullable: true })
  public dernierFeuillet: string;

  @ManyToOne(() => AgentEntity, (object) => object.id, {
    cascade: true,
    eager: false,
  })
  @JoinColumn({ name: 'gestionnaire' })
  /** TO BE CHANGED TO Gestionnaire entity later, at least a Gestionnaire is an agent */
  public gestionnaire: AgentEntity;

  @Column({ name: 'date_affectation', nullable: true, type: 'date' })
  public dateAffectation: Date;

  @Column({ name: 'date_retrait', nullable: true, type: 'date' })
  public dateRetrait: Date;

  @Column({ name: 'mat_agent_retrait', nullable: true })
  public matAgentRetrait: string;

  @Column({ name: 'nom_agent_retrait', nullable: true })
  public nomAgentRetrait: string;

  @Column({ name: 'num_cni_agent_retrait', nullable: true })
  public numCniAgentRetrait: string;

  @Column({ name: 'date_delivrance_cni', nullable: true, type: 'date' })
  public dateDelivranceCni: Date;

  @Column({ name: 'lieu_delivrance_cni', nullable: true })
  public lieuDelivranceCni: string;

  /** TO ADD LATER WHEN MANDAT WILL BE AVAILABLE 
  @OneToMany(() => Mandat, (mandat) => mandat.carnet)
  public mandats: Mandat[];
  */
  constructor(param?: Partial<CarnetMandatEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
