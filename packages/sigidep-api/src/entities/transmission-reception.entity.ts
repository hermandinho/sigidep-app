import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'transmissions_receptions',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class TransmissionReceptionEntity extends BaseEntity {
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

  // RELATIONS
  @ManyToOne(() => UserEntity, (object) => object.id, {
    eager: false,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  public createdBy: UserEntity;

}
