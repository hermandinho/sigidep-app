import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ParagraphEntity } from '@entities/paragraph.entity';
import { UserEntity } from '@entities/user.entity';

@Entity({
  name: 'reference_physical_units',
})
export class ReferencePhysicalUnitEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label_fr', nullable: false })
  public labelFr: string;

  @Column({ name: 'label_en', nullable: false })
  public labelEn: string;

  // Relations
  @ManyToOne(() => ParagraphEntity, (object) => object.referencePhysicalUnits, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'paragraph_id' })
  public paragraph: Partial<ParagraphEntity>;

  @ManyToOne(() => UserEntity, (object) => object.id, {
    eager: false,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  public createdBy: UserEntity;

  constructor(params?: ReferencePhysicalUnitEntity) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
