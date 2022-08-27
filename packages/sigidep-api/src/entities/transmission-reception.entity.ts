import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { TraitementBonEngagementEntity } from './traitement-bon-engagement.entity';

@ChildEntity({ name: 'transmissions_receptions' })
export class TransmissionReceptionEntity extends TraitementBonEngagementEntity {
  @Column({ name: 'numero', nullable: true })
  public numero: string;

  @Column({ nullable: true, type: 'text', name: 'objet' })
  public objet: string;

  @Column('varchar',{ nullable: true, name: 'serviceSource' })
  public serviceSource: string;

  @Column('varchar', { nullable: true, name: 'serviceDestination' })
  public serviceDestination: string;

  @Column('varchar',{ nullable: true, name: 'lieu' })
  public lieu: string;

}
