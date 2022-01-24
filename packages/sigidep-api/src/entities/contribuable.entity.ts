import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { AgencesEntity, BanksEntity } from '.';
import { BaseEntity } from './base.entity';
import { RegimeFiscalEntity } from './regime-fiscal.entity';

@Entity({
  name: 'contribuables',
  orderBy: {
    code: 'ASC',
  },
})
@Unique('UQ_CONTRIBUBALE_CODE', ['code'])
export class ContribuableEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string; //NIU

  @Column({ name: 'raison_sociale', nullable: false })
  public raisonSociale: string;

  @Column({ name: 'secteur_activite', nullable: false })
  public secteurActivite: string;

  @ManyToOne(() => RegimeFiscalEntity, (object) => object.code, {
    cascade: true,
    eager: false,
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

  @Column({ name: 'contact', nullable: false })
  public contact: string;

  @Column({ name: 'email', nullable: true })
  public email: string;

  @ManyToOne(() => BanksEntity, (object) => object.code, {
    cascade: true,
    eager: false,
  })
  @JoinColumn({ name: 'code_banque' })
  public banque?: BanksEntity;

  @ManyToOne(() => AgencesEntity, (object) => object.code, {
    cascade: true,
    eager: false,
  })
  @JoinColumn({ name: 'code_agence' })
  public agence?: AgencesEntity;

  @Column({ name: 'numero_compte', nullable: false })
  public numeroCompte?: string;

  @Column({ name: 'cle', nullable: false })
  public cle?: string;
}
