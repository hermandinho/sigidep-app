import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { FinancialSourceEntity } from '@entities/financial-source.entity';
import { ReferencePhysicalUnitEntity } from '@entities/reference-physical-unit.entity';

@Entity({
  name: 'paragraphs',
  orderBy: {
    code: 'ASC',
  },
})
export class ParagraphEntity extends BaseEntity {
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

  // RELATIONS
  @ManyToOne(() => FinancialSourceEntity, (object) => object.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'financial_source_id' })
  public nature: FinancialSourceEntity;

  @OneToMany(() => ReferencePhysicalUnitEntity, (object) => object.paragraph)
  referencePhysicalUnits: ReferencePhysicalUnitEntity[];

  constructor(params?: Partial<ParagraphEntity>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
