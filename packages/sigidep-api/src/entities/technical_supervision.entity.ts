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

  @Column({ name: 'abbreviation_fr', nullable: true })
  public abbreviationFr: string;

  @Column({ name: 'abbreviation_en', nullable: true })
  public abbreviationeEn: string;
}
