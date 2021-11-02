import { BaseEntity } from '@entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { AdministrativeUnitEntity } from '@entities/administrative-unit.entity';
import { PrimaryFunctionsEntity } from '@entities/primary-functions.entity';

@Entity({
  name: 'sectors',
})
@Unique('UQ_SECTOR_CODE', ['code'])
export class SectorEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label_fr', nullable: false })
  public labelFr: string;

  @Column({ name: 'label_en', nullable: false })
  public labelEn: string;

  // RELATIONS
  @OneToMany(() => AdministrativeUnitEntity, (object) => object.sector, {})
  public administrativeUnits: AdministrativeUnitEntity[];

  @OneToMany(() => PrimaryFunctionsEntity, (object) => object.sector, {})
  public functions: PrimaryFunctionsEntity[] | Partial<PrimaryFunctionsEntity>[];

  @ManyToOne(() => UserEntity, (object) => object.id, {
    eager: false,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  public createdBy: UserEntity;

  constructor(param?: Partial<SectorEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
