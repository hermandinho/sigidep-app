import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '.';

@Entity({
  name: 'traitement',
})
//@Unique('CODE_ETAPE', ['codeEtape'])
export class TraitementEntity extends BaseEntity {
  @Column({ name: 'code_etape', nullable: false })
  public codeEtape: number;

  @Column({ name: 'label', nullable: false })
  public label: string;

  constructor(param?: Partial<TraitementEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
