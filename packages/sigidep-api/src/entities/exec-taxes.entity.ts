import { Column, Entity } from 'typeorm';
import { BaseEntity } from '.';
@Entity({
  name: 'exectaxes',
  orderBy: {
    code: 'ASC',
  },
})
export class ExecTaxesEntity extends BaseEntity {
  @Column({ name: 'code', nullable: true })
  public code: string;

  @Column({ name: 'label', nullable: false })
  public label: string;

  @Column({ type: 'float', nullable: true })
  TxTVA: number;

  @Column({ type: 'float', nullable: true })
  TxIR: number;
}
