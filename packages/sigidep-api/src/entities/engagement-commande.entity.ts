import { Column, Entity } from 'typeorm';
import { EngagementJuridiqueEntity } from '.';

@Entity({
  name: 'engagement-commande',
})
export class EngagementCommandeEntity extends EngagementJuridiqueEntity {
  @Column()
  public reference: string;
  @Column()
  public objet: string;
  @Column({ type: 'float' })
  public montantTTC: number;
}
