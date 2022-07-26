import { Column, Entity } from 'typeorm';
import {
  HistoryActionColumn,
  HistoryActionType,
  HistoryEntityInterface,
} from 'typeorm-revisions';
import { EngagementJuridiqueEntity } from './engagement-juridique.entity';

@Entity({
  name: 'engagement-history',
})
export class EngagementJuridiqueHistoryEntity
  extends EngagementJuridiqueEntity
  implements HistoryEntityInterface
{
  @Column()
  public originalID!: number;

  @HistoryActionColumn()
  public action!: HistoryActionType;

  makeActionAt: Date;

  constructor(param?: Partial<EngagementJuridiqueHistoryEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
