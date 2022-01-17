import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'regime_fiscal',
  orderBy: {
    code: 'ASC',
  },
})
export class RegimeFiscalEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'description', nullable: true })
  public description: string;
}
