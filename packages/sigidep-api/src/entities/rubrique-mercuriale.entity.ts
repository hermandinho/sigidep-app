import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from '.';
import { SousRubriqueMercurialeEntity } from './sous-rubriques-mercuriales.entity';

@Entity({
  name: 'rubriques_mercuriales',
  orderBy: {
    code: 'ASC',
  },
})
@Unique('UQ_RUBRIQUE_MERCURIALE_CODE', ['code'])
export class RubriqueMercurialeEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label', nullable: true })
  public label?: string;

  @OneToMany(
    (type) => SousRubriqueMercurialeEntity,
    (sousRubrique) => sousRubrique.rubrique,
  )
  public sousRubriques: SousRubriqueMercurialeEntity[];

  constructor(param?: Partial<RubriqueMercurialeEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
