import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity, FactureArticleEntity } from '.';
import { BonEngagementEntity } from './bon-engagement.entity';

@Entity({
  name: 'factures',
})
export class FactureEntity extends BaseEntity {
  @Column({ name: 'date', type: 'date', nullable: true })
  date: Date;
  @Column({ name: 'reference', nullable: false })
  reference: string;
  @Column({ name: 'objet', nullable: false })
  objet: string;

  @Column({ type: 'float', name: 'taux_TVA', nullable: false })
  tauxTVA: number;
  @Column({ type: 'float', name: 'taux_IR', nullable: false })
  tauxIR: number;
  @Column({ type: 'float', name: 'montant_TTC', nullable: false })
  montantTTC: number;
  @Column({ type: 'float', name: 'montant_HT', nullable: false })
  montantHT: number;
  @Column({ type: 'float', name: 'montant_TVA', nullable: false })
  montantTVA: number;
  @Column({ type: 'float', name: 'montant_IR', nullable: false })
  montantIR: number;
  @Column({ type: 'float', name: 'netAPercevoir', nullable: false })
  netAPercevoir: number;
  @Column({ name: 'surfracturation', nullable: true })
  surfracturation: boolean;

  @Column({ name: 'morcellement', nullable: true })
  morcellement: boolean;

  @OneToOne(() => BonEngagementEntity, (object) => object.facture, {
    nullable: false,
  })
  public bon: BonEngagementEntity;

  @OneToMany(() => FactureArticleEntity, (object) => object.facture, {
    eager: true,
    nullable: true,
    cascade: ['insert', 'update', 'remove'],
  })
  articles: FactureArticleEntity[];

  constructor(param?: Partial<FactureEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
