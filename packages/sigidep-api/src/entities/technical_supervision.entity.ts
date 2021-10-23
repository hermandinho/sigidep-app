import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'technical_supervisions',
  orderBy: {
    code: 'ASC',
    label: 'ASC',
  },
})
export class TechnicalSupervisionEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label', nullable: false })
  public label: string;
}
