import { applyMixins } from '@utils/mixins';
import { Column, Entity } from 'typeorm';
import {
  HistoryActionColumn,
  HistoryActionType,
  HistoryEntityInterface,
} from 'typeorm-revisions';
import { EngagementMissionEntity } from './engagement-mission.entity';

@Entity({
  name: 'engagement-history',
})
export class EngagementJuridiqueHistoryEntity
  extends EngagementMissionEntity
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
