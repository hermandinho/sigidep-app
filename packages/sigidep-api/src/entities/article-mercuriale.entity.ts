import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '.';
import { SousRubriqueMercurialeEntity } from './sous-rubriques-mercuriales.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'articles_mercuriales',
  orderBy: {
    code: 'ASC',
  },
})
@Unique('UQ_ARTICLE_MERCURIALE_CODE', ['code'])
export class ArticleMercurialeEntity extends BaseEntity {
  @Column({ name: 'numero_serie', nullable: false })
  public serie: string;

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
    (sousRubrique) => sousRubrique.articles,
    {
      cascade: true,
      eager: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'sous_rubrique_id' })
  @ApiProperty({ type: () => SousRubriqueMercurialeEntity })
  public sousRubrique: SousRubriqueMercurialeEntity;

  constructor(param?: Partial<ArticleMercurialeEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
