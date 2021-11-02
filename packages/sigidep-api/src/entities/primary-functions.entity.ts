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
import { SecondaryFunctionsEntity } from '@entities/secondary-functions.entity';
import { SectorEntity } from '@entities/sector.entity';

@Entity({
  name: 'primary_functions',
})
@Unique('UQ_PRIMARY_FUNCTION_CODE', ['code'])
export class PrimaryFunctionsEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label_fr', nullable: false })
  public labelFr: string;

  @Column({ name: 'label_en', nullable: false })
  public labelEn: string;

  // RELATIONS
  @OneToMany(() => SecondaryFunctionsEntity, (object) => object.parent)
  public children:
    | SecondaryFunctionsEntity[]
    | Partial<SecondaryFunctionsEntity>[];

  @ManyToOne(() => SectorEntity, (object) => object.functions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sector_id' })
  public sector: SectorEntity;

  @ManyToOne(() => UserEntity, (object) => object.id, {
    eager: false,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  public createdBy: UserEntity;

  constructor(param?: Partial<PrimaryFunctionsEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
