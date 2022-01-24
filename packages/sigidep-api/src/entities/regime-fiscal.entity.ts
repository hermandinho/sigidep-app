import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'regime_fiscal',
  orderBy: {
    code: 'ASC',
  },
})
@Unique('UQ_REGIME_FISCAL_CODE', ['code'])
export class RegimeFiscalEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'description', nullable: true })
  public description: string;

  constructor(id: number, code: string, description: string) {
    super();
    this.id = id;
    this.code = code;
    this.description = description;
  }
}
