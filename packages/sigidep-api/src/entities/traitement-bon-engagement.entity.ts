import { EtatBonEnum } from '@utils/etat-bon.enum';
import { Column, Entity, JoinColumn, ManyToOne, TableInheritance } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BonEngagementEntity } from './bon-engagement.entity';
import { UserEntity } from './user.entity';

@Entity('traitements_bons_engagements')
@TableInheritance({ column: { type: 'varchar', name: 'type',nullable: true,default:'type' } })
export class TraitementBonEngagementEntity extends BaseEntity {
  @ManyToOne(() => BonEngagementEntity, (object) => object.traitements, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bon_id' })
  bon!: BonEngagementEntity;

  @Column({
    name: 'typeTraitement',
    type: 'enum',
    enum: EtatBonEnum,
    nullable: true,
  })
  public typeTraitement!: EtatBonEnum;

  @Column('varchar', { nullable: true, name: 'observation' })
  observation!: string;
  @Column({ nullable: true, type: 'float', name: 'qteUnitePhysiqueReal' })
  qteUnitePhysiqueReal!: number;
  @Column({ nullable: true, type: 'float', name: 'montantTotalUnitPhysReal' })
  montantTotalUnitPhysReal!: number;

  @Column({ default: '2000-01-01', type: 'date', name: 'dateLiquidation' })
  public dateLiquidation!: Date;

  @Column('varchar', { nullable: true, name: 'numOrdreLiquidation' })
  public numOrdreLiquidation!: string;

  @Column('varchar', { nullable: true, name: 'rubriqueLiquidation' })
  public rubriqueLiquidation!: string;

  @Column({ nullable: true, type: 'float', name: 'montantLiquidation' })
  montantLiquidation!: number;

  @Column({ default: false, type: 'boolean', name: 'liquidation' })
  public liquidation!: boolean;

  @Column({ default: '2000-01-01', type: 'date', name: 'dateOrdonnancement' })
  public dateOrdonnancement!: Date;

  @Column({ default: false, type: 'boolean', name: 'ordonnancement' })
  public ordonnancement!: boolean;

  @Column('varchar', { nullable: true, name: 'numOrdreOrdonnancement' })
  public numOrdreOrdonnancement!: string;

  @Column('varchar', { nullable: true, name: 'rubriqueOrdonnancement' })
  public rubriqueOrdonnancement!: string;

  @Column({ nullable: true, type: 'float', name: 'montantOrdonnancement' })
  montantOrdonnancement!: number;

  @Column('varchar', { nullable: true, name: 'motif' })
  public motif!: string;

  @Column('varchar', { nullable: true, name: 'piecesJointe' })
  public piecesJointe!: string;
  constructor(param?: Partial<TraitementBonEngagementEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
