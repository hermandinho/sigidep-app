import { Column, Entity } from 'typeorm';
import { EngagementJuridiqueEntity } from '.';

@Entity({
  name: 'engagement-commande',
})
export class EngagementCommandeEntity extends EngagementJuridiqueEntity {
  @Column()
  public niuContribuable: string;

  @Column()
  public raisonSocialeContribuable: string;

  @Column()
  public codeBanqueContribuable: string;

  @Column()
  public codeAgenceContribuable: string;

  @Column()
  public numeroCompteContribuable: string;

  @Column()
  public cleCompteContribuable: string;

  public reference: string;
  @Column()
  public objet: string;
  @Column({ type: 'float' })
  public montantTTC: number;
}
