import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '.';
import { SousRubriqueMercurialeEntity } from './sous-rubriques-mercuriales.entity';

@Entity({
  name: 'articles_mercuriales',
  orderBy: {
    code: 'ASC',
  },
})
@Unique('UQ_ARTICLE_MERCURIALE_CODE', ['code'])
export class ArticleMercurialeEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'designation', nullable: false })
  public designation: string;

  @Column({ name: 'conditionnement', nullable: true })
  public conditionnement: string;

  @Column({ nullable: true, type: 'float' })
  public prix: number;

  @ManyToOne(
    () => SousRubriqueMercurialeEntity,
    (sousRubrique) => sousRubrique.id,
    {
      cascade: true,
      eager: true,
    },
  )
  @JoinColumn({ name: 'sous_rubrique_id' })
  public sousRubrique: SousRubriqueMercurialeEntity;

  constructor(param?: Partial<ArticleMercurialeEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
