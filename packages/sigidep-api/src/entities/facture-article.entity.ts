import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity, FactureEntity } from '.';
import { ArticleMercurialeEntity } from './article-mercuriale.entity';

@Entity({
  name: 'facture_article',
})
export class FactureArticleEntity extends BaseEntity {
  @Column({ nullable: false })
  quantite: number;

  @ManyToOne(() => FactureEntity, (object) => object.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'facture_id' })
  public facture: FactureEntity;

  @ManyToOne(() => ArticleMercurialeEntity, (object) => object.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'article_id' })
  public article: ArticleMercurialeEntity;

  constructor(param?: Partial<FactureArticleEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
