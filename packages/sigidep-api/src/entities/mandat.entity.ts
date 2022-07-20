import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'mandat',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class MandatEntity extends BaseEntity {
  @Column({ name: 'numero', nullable: true })
  public numero: string;

  constructor(param?: Partial<MandatEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
