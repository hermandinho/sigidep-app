import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '.';

@Entity({
  name: 'grades',
})
@Unique('UQ_GRADE_CODE', ['code'])
export class GradeEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'description', nullable: true })
  public description?: string;

  constructor(param?: Partial<GradeEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
