import { BonEngagementEntity } from '@entities/bon-engagement.entity';
import { BonEngagementHistoryEntity } from '@entities/bon-engagement.history.entity';
import { EventSubscriber } from 'typeorm';
import { HistoryActionType, HistorySubscriber } from 'typeorm-revisions';

@EventSubscriber()
export class TraitementBonEngagementSubscriber extends HistorySubscriber<
  BonEngagementEntity,
  BonEngagementHistoryEntity
> {
  public get entity() {
    return BonEngagementEntity;
  }
  public get historyEntity() {
    return BonEngagementHistoryEntity;
  }

  beforeHistory(
    action: HistoryActionType,
    history: BonEngagementHistoryEntity,
  ): void | Promise<void> {
    history.makeActionAt = new Date();
    history.facture = null;
  }
}
