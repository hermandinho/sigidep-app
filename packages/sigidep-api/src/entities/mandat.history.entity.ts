import { Column, Entity } from 'typeorm';
import {
  HistoryActionColumn,
  HistoryActionType,
  HistoryEntityInterface,
} from 'typeorm-revisions';
import { MandatEntity } from './mandat.entity';

@Entity({
  name: 'mandat-history',
})
export class MandatHistoryEntity
  extends MandatEntity
  implements HistoryEntityInterface
{
  @Column()
  originalID!: string;

  @Column()
  makeActionAt!: Date;

  @HistoryActionColumn()
  action!: HistoryActionType;

  constructor(param?: Partial<MandatHistoryEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
