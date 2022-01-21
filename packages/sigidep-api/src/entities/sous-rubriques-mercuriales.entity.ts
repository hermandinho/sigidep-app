import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { BaseEntity } from '.';
import { ArticleMercurialeEntity } from './article-mercuriale.entity';
import { RubriqueMercurialeEntity } from './rubrique-mercuriale.entity';

@Entity({
  name: 'sous_rubriques_mercuriales',
  orderBy: {
    code: 'ASC',
  },
})
@Unique('UQ_SOUS_RUBRIQUE_MERCURIALE_CODE', ['code'])
export class SousRubriqueMercurialeEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label', nullable: true })
  public label?: string;

  @ManyToOne(
    (type) => RubriqueMercurialeEntity,
    (rubrique) => rubrique.sousRubriques,
  )
  @JoinColumn({ name: 'rubrique_id' })
  public rubrique: RubriqueMercurialeEntity;

  @OneToMany(
    (type) => ArticleMercurialeEntity,
    (article) => article.sousRubrique,
  )
  public articles: ArticleMercurialeEntity[];

  constructor(param?: Partial<SousRubriqueMercurialeEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
