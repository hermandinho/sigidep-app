import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '.';

@Entity({
  name: 'baremes_missions',
})
@Unique('UQ_BAREME_MISSION_CODE', ['code'])
export class BaremeMissionEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ nullable: true, type: 'float' })
  public montant: number;

  constructor(param?: Partial<BaremeMissionEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
