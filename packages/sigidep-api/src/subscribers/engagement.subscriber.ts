import {
  EngagementJuridiqueEntity,
  EtatEngagementEnum,
} from '@entities/engagement-juridique.entity';
import { EngagementJuridiqueHistoryEntity } from '@entities/engagement.history.entity';
import { EventSubscriber } from 'typeorm';
import { HistoryActionType, HistorySubscriber } from 'typeorm-revisions';

@EventSubscriber()
export class EngagementHistorySubscriber extends HistorySubscriber<
  EngagementJuridiqueEntity,
  EngagementJuridiqueHistoryEntity
> {
  public get entity() {
    return EngagementJuridiqueEntity;
  }
  public get historyEntity() {
    return EngagementJuridiqueHistoryEntity;
  }
  beforeHistory(
    action: HistoryActionType | EtatEngagementEnum,
    history: EngagementJuridiqueHistoryEntity,
  ): void | Promise<void> {
    history.makeActionAt = new Date();
  }
}
