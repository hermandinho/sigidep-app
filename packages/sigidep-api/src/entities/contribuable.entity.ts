import { RegimeFiscalEnum } from '@utils/regime-fiscal.enum';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'contribuable',
  orderBy: {
    code: 'ASC',
  },
})
export class ContribuableEntity extends BaseEntity {
  @Column({ name: 'code', nullable: true })
  public code: string; //NIU

  @Column({ name: 'raison_sociale', nullable: false })
  public raisonSociale: string;

  @Column({ name: 'secteur_activite', nullable: false })
  public secteurActivite: string;

  @Column({ name: 'regime_fiscal', nullable: false })
  public regimeFiscal: RegimeFiscalEnum;

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

  @Column({ name: 'code_banque', nullable: false })
  public codeBanque: string;

  @Column({ name: 'code_agence', nullable: false })
  public codeAgence: string;

  @Column({ name: 'numero_compte', nullable: false })
  public numeroCompte: string;

  @Column({ name: 'cle', nullable: false })
  public cle: string;
}
