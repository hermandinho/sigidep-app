import { BaseEntity } from '@entities/base.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { AgencesEntity } from './agence.entity';

@Entity({
  name: 'banks',
})
@Unique('UQ_BANK_CODE', ['code'])
export class BanksEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label', nullable: false })
  public label: string;

  // RELATIONS

  @OneToMany(() => AgencesEntity, (object) => object.bank, {})
  public agences: AgencesEntity[];

  constructor(param?: Partial<BanksEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
