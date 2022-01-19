import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '.';

@Entity({
  name: 'categorie_agent',
})
@Unique('UQ_CATEGORIE_AGENT_CODE', ['code'])
export class CategorieAgentEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label', nullable: false })
  public label: string;

  constructor(param?: Partial<CategorieAgentEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
