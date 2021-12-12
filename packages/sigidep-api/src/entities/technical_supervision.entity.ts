import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'technical_supervisors',
})
export class TechnicalSupervisionEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label_fr', nullable: false })
  public labelFr: string;

  @Column({ name: 'label_en', nullable: false })
  public labelEn: string;

  @Column({ name: 'abbreviation_fr', nullable: false })
  public abbreviationFr: string;

  @Column({ name: 'abbreviation_en', nullable: false })
  public abbreviationEn: string;

  constructor(params?: TechnicalSupervisionEntity) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
