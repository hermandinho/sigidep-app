import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '.';

@Entity({
  name: 'types_procedures',
})
@Unique('UQ_TYPE_PROCEDURE_CODE', ['code'])
export class TypeProcedureEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label', nullable: false })
  public label: string;

  constructor(param?: Partial<TypeProcedureEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
