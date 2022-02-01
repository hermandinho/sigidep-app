import { BaseEntity } from '@entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BanksEntity } from './bank.entity';

@Entity({
  name: 'agences',
})
export class AgencesEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label', nullable: false })
  public label: string;

  // RELATIONS
  @ManyToOne(() => BanksEntity, (object) => object.id, {
    eager: false,
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'bankId' })
  public bank: BanksEntity;

  constructor(param?: Partial<AgencesEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
