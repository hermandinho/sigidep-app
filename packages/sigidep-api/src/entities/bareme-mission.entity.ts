import { Column, Entity } from 'typeorm';
import { BaseEntity } from '.';

@Entity({
  name: 'baremes_missions',
})
export class BaremeMissionEntity extends BaseEntity {
  @Column({ nullable: true, type: 'float' })
  public montant: number;

  constructor(param?: Partial<BaremeMissionEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
