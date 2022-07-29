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

  @Column({ default: '2000-01-01', type: 'date', name: 'dateValidACT' })
  public dateValidACT: Date;
  @Column('varchar', { nullable: true, name: 'modePaiement' })
  public modePaiement!: string;

  @Column('varchar', { nullable: true, name: 'compteADebiter' })
  public compteADebiter!: string;

  @Column('varchar', { nullable: true, name: 'compteACrediter' })
  public compteACrediter!: string;

  @Column({ default: '2000-01-01', type: 'date', name: 'datePaiement' })
  public datePaiement: Date;

  @Column('varchar', { nullable: true, name: 'villePaiement' })
  public villePaiement!: string;

  @Column({ default: false, type: 'boolean', name: 'paye' })
  public paye: boolean;

  @Column({ default: false, type: 'boolean', name: 'ValidACT' })
  public ValidACT: boolean;

  constructor(param?: Partial<PaiementEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
