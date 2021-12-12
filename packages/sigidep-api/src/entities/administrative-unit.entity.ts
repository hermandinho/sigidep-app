import { BaseEntity } from '@entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { SectorEntity } from '@entities/sector.entity';
import { RegionEntity } from '@entities/region.entity';
import { CategoriesEntity } from '@entities/categories.entity';
import { SecondaryFunctionsEntity } from '@entities/secondary-functions.entity';

@Entity({
  name: 'administrative_units',
})
@Unique('UQ_ADMINISTRATIVE_UNIT_CODE', ['code'])
export class AdministrativeUnitEntity extends BaseEntity {
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
  @ManyToOne(() => CategoriesEntity, (object) => object.administrativeUnits, {
    eager: false,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  public category: CategoriesEntity;

  @ManyToOne(() => SectorEntity, (object) => object.administrativeUnits, {
    eager: false,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'sector_id' })
  public sector: SectorEntity;

  @ManyToOne(() => RegionEntity, (object) => object.administrativeUnits, {
    eager: false,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'region_id' })
  public region: RegionEntity;

  @ManyToOne(
    () => SecondaryFunctionsEntity,
    (object) => object.administrativeUnits,
    {
      eager: false,
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  @JoinColumn({ name: 'secondary_function_id' })
  public function: SecondaryFunctionsEntity;

  @ManyToOne(() => UserEntity, (object) => object.id, {
    eager: false,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  public createdBy: UserEntity;

  constructor(param?: Partial<AdministrativeUnitEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
