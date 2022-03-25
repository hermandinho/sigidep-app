import { ChildEntity, Column, Entity, ManyToOne } from 'typeorm';
import { EngagementJuridiqueEntity } from '.';
import { ExecTaxesEntity } from './exec-taxes.entity';

@ChildEntity({
  name: 'engagement_commande',
})
export class EngagementCommandeEntity extends EngagementJuridiqueEntity {
  @Column({ nullable: true, name: 'niu_contribuable' })
  public niuContribuable: string;

  @Column({ nullable: true, name: 'raison_sociale' })
  public raisonSociale: string;

  @Column({ nullable: true, name: 'code_banque_contribuable' })
  public codeBanqueContribuable: string;

  @Column({ nullable: true, name: 'code_agence_contribuable' })
  public codeAgenceContribuable: string;

  @Column({ nullable: true, name: 'numero_compte_contribuable' })
  public numeroCompteContribuable: string;

  @Column({ nullable: true, name: 'cle_compte_contribuable' })
  public cleCompteContribuable: string;

  @Column({ type: 'float', nullable: true, name: 'montant_TTC' })
  public montantTTC: number;

  @Column({ type: 'float', nullable: true, name: 'taux_TVA' })
  public tauxTVA: number;

  @ManyToOne(() => ExecTaxesEntity, (object) => object.id, {
    eager: true,
    nullable: true,
    cascade: false,
  })
  public taxesApplicable: ExecTaxesEntity;
}
