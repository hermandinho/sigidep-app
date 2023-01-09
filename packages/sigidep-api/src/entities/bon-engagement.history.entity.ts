import { Column, Entity } from 'typeorm';
import {
  HistoryActionColumn,
  HistoryActionType,
  HistoryEntityInterface,
} from 'typeorm-revisions';
import { BonEngagementEntity } from './bon-engagement.entity';

@Entity({
  name: 'bon_engagement_history',
})
export class BonEngagementHistoryEntity
  extends BonEngagementEntity
  implements HistoryEntityInterface
{
  @Column()
  originalID!: string;

  makeActionAt!: Date;

  @HistoryActionColumn()
  action!: HistoryActionType;

  constructor(param?: Partial<BonEngagementHistoryEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
