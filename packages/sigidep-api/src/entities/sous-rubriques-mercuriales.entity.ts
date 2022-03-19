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
export class SousRubriqueMercurialeEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label', nullable: true })
  public label?: string;

  @ManyToOne(
    () => RubriqueMercurialeEntity,
    (rubrique) => rubrique.sousRubriques,
    {
      cascade: true,
      eager: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'rubrique_id' })
  public rubrique: RubriqueMercurialeEntity;

  @OneToMany(() => ArticleMercurialeEntity, (article) => article.sousRubrique, {
    eager: true,
  })
  public articles: Partial<ArticleMercurialeEntity>[];

  constructor(param?: Partial<SousRubriqueMercurialeEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
