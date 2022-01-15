import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RegimeFiscalEntity } from './regime-fiscal.entity';

@Entity({
  name: 'contribuable',
  orderBy: {
    code: 'ASC',
  },
})
export class ContribuableEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string; //NIU

  @Column({ name: 'raison_sociale', nullable: false })
  public raisonSociale: string;

  @Column({ name: 'secteur_activite', nullable: false })
  public secteurActivite: string;

  @ManyToOne(() => RegimeFiscalEntity, (object) => object.id, {
    eager: false,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'regime_fiscal' })
  public regimeFiscal: RegimeFiscalEntity;

  @Column({ name: 'adresse', nullable: true })
  public adresse: string;

  @Column({ name: 'quartier', nullable: true })
  public quartier: string;

  @Column({ name: 'localisation', nullable: true })
  public localisation: string;

  @Column({ name: 'siege', nullable: true })
  public siege: string;

  @Column({ name: 'ville', nullable: true })
  public ville: string;

  @Column({ name: 'contact', nullable: true })
  public contact: string;

  @Column({ name: 'email', nullable: true })
  public email: string;

  @Column({ name: 'rib', nullable: true })
  public rib: string; //RIB
}
