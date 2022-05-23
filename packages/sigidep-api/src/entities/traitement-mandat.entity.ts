import { EtatMandatEnum } from '@utils/etat-mandat.enum';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MandatEntity } from './mandat.entity';

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

  etat!: EtatMandatEnum;

  observation!: string;
  qteUnitePhysiqueReal!: number;
  montantTotalUnitPhysReal!: number;

  constructor(param?: Partial<TraitementMandatEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
