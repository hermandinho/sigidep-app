import { ChildEntity, Column, Entity } from 'typeorm';
import { EngagementJuridiqueEntity } from '.';

@ChildEntity({ name: 'engagement-decision' })
export class EngagementDecisionEntity extends EngagementJuridiqueEntity {
  @Column()
  public numeroDecision: string;
  @Column({ type: 'date' })
  public dateSignature: Date;
  @Column()
  public objet: string;
  @Column()
  public nomSignataire: string;
  @Column()
  public matriculeBeneficiaire: string;
  @Column()
  public nomBeneficiaire: string;
  @Column()
  public numContribBudget: string;
  @Column()
  public nomContribBudget: string;
  @Column({ type: 'float' })
  public montantHT: number;
  @Column({ type: 'float' })
  public montantTaxe: number;
  @Column({ type: 'float' })
  public montantTTC: number;
  @Column({ type: 'float' })
  public netAPercevoir: number;
}
