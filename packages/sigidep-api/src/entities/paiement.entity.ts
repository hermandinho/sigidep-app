import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BonEngagementEntity } from './bon-engagement.entity';

@Entity({
  name: 'paiement',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class PaiementEntity extends BaseEntity {
  @ManyToOne(() => BonEngagementEntity, (object) => object.paiements, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bon_id' })
  bon!: BonEngagementEntity;
  @Column('varchar', { nullable: true, name: 'numeroPaiement' })
  public numeroPaiement!: string;

  @Column('varchar',{nullable:true, name: 'dateValidACT' })
  public dateValidACT: string;
  @Column('varchar', { nullable: true, name: 'modePaiement' })
  public modePaiement!: string;

  @Column('varchar', { nullable: true, name: 'compteADebiter' })
  public compteADebiter!: string;

  @Column('varchar', { nullable: true, name: 'compteACrediter' })
  public compteACrediter!: string;

  @Column('varchar',{nullable:true, name: 'datePaiement' })
  public datePaiement: string;

  @Column('varchar', { nullable: true, name: 'villePaiement' })
  public villePaiement!: string;

  @Column('varchar', { nullable: true, name: 'numeroCNI' })
  public numeroCNI!: string;

  @Column('varchar', { nullable: true, name: 'dateDelivrance' })
  public dateDelivrance!: string;

  @Column('varchar', { nullable: true, name: 'lieuDelivrance' })
  public lieuDelivrance!: string;

  @Column({ default: false, type: 'boolean', name: 'paye' })
  public paye: boolean;

  @Column({ default: false, type: 'boolean', name: 'validACT' })
  public validACT: boolean;

  constructor(param?: Partial<PaiementEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
