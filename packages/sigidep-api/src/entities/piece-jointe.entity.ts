import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '.';

@Entity({
  name: 'pieces_jointes',
})
@Unique('UQ_PIECE_JOINTE_CODE', ['code'])
export class PieceJointeEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'order', nullable: false })
  public order: number;

  @Column({ name: 'label', nullable: true })
  public label: string;

  constructor(param?: Partial<PieceJointeEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
