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
import { PrimaryFunctionsEntity } from '@entities/primary-functions.entity';
import { AdministrativeUnitEntity } from '@entities/administrative-unit.entity';

@Entity({
  name: 'secondary_functions',
})
@Unique('UQ_SECONDARY_FUNCTION_CODE', ['code'])
export class SecondaryFunctionsEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label_fr', nullable: false })
  public labelFr: string;

  @Column({ name: 'label_en', nullable: false })
  public labelEn: string;

  // RELATIONS
  @ManyToOne(() => PrimaryFunctionsEntity, (object) => object.children, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'function_id' })
  public parent: PrimaryFunctionsEntity;

  @OneToMany(() => AdministrativeUnitEntity, (object) => object.region, {})
  public administrativeUnits: AdministrativeUnitEntity[];

  @ManyToOne(() => UserEntity, (object) => object.id, {
    eager: false,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  public createdBy: UserEntity;

  constructor(param?: Partial<SecondaryFunctionsEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
