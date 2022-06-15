import { EtatMandatEnum } from '@utils/etat-mandat.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MandatEntity } from './mandat.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'traitement-mandat',
})
export class TraitementMandatEntity extends BaseEntity {
  @ManyToOne(() => MandatEntity, (object) => object.traitements, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'mandat_id' })
  mandat!: MandatEntity;

  @Column({
    name: 'typeTraitement',
    type: 'enum',
    enum: EtatMandatEnum,
    nullable: true,
  })
  public typeTraitement!: EtatMandatEnum;

  @Column('varchar',{ nullable: true, name: 'observation' })
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
    // RELATIONS
    @ManyToOne(() => UserEntity, (object) => object.id, {
      eager: false,
      onDelete: 'SET NULL',
      nullable: true,
    })
    @JoinColumn({ name: 'created_by' })
    public createdBy!: UserEntity;

  constructor(param?: Partial<TraitementMandatEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
