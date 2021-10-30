import { BaseEntity } from '@entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { UserEntity } from '@entities/user.entity';

@Entity({
  name: 'financial_sources',
})
@Unique('UQ_CODE', ['code'])
export class FinancialSourceEntity extends BaseEntity {
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

  @Column({ name: 'accepts_deliverables', default: false })
  public acceptsDeliverables: boolean;

  // RELATIONS
  @ManyToOne(() => UserEntity, (object) => object.id, {
    eager: false,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  public createdBy: UserEntity;

  constructor(param?: Partial<FinancialSourceEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
