import { MandatEntity } from '@entities/mandat.entity';
import { MandatHistoryEntity } from '@entities/mandat.history.entity';
import { EventSubscriber } from 'typeorm';
import { HistoryActionType, HistorySubscriber } from 'typeorm-revisions';

@EventSubscriber()
export class TraitementMandatSubscriber extends HistorySubscriber<
  MandatEntity,
  MandatHistoryEntity
> {
  public get entity() {
    return MandatEntity;
  }
  public get historyEntity() {
    return MandatHistoryEntity;
  }

  beforeHistory(
    action: HistoryActionType,
    history: MandatHistoryEntity,
  ): void | Promise<void> {
    history.makeActionAt = new Date();
  }
}
