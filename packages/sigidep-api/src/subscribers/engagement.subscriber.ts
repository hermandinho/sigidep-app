import { EngagementJuridiqueEntity } from '@entities/engagement-juridique.entity';
import { EngagementMissionEntity } from '@entities/engagement-mission.entity';
import { EngagementJuridiqueHistoryEntity } from '@entities/engagement.history.entity';
import { EventSubscriber } from 'typeorm';
import { HistorySubscriber } from 'typeorm-revisions';

@EventSubscriber()
export class EngagementHistorySubscriber extends HistorySubscriber<
  EngagementMissionEntity,
  EngagementJuridiqueHistoryEntity
> {
  public get entity() {
    return EngagementMissionEntity;
  }
  public get historyEntity() {
    return EngagementJuridiqueHistoryEntity;
  }
}
