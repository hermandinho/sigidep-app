import { ChildEntity, Column, Entity } from 'typeorm';
import { EngagementJuridiqueEntity } from '.';

@ChildEntity({
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

  @Column({ type: 'float' })
  public montantTTC: number;
}
