import {Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MandatEntity } from './mandat.entity';

@Entity({
  name: 'paiement',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class PaiementEntity extends BaseEntity {

  @ManyToOne(() => MandatEntity, (object) => object.paiements, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'mandat_id' })
  mandat!: MandatEntity;

  @Column({ default:'2000-01-01', type: 'date', name: 'dateValidACT' })
  public dateValidACT: Date;
  @Column('varchar', { nullable: true, name: 'modePaiement' })
  public modePaiement!: string;

  @Column('varchar', { nullable: true, name: 'compteADebiter' })
  public compteADebiter!: string;

  @Column('varchar', { nullable: true, name: 'compteACrediter' })
  public compteACrediter!: string;

  @Column({ default:'2000-01-01', type: 'date', name: 'datePaiement' })
  public datePaiement:Date;

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
