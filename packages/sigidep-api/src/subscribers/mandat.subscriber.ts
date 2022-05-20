import { MandatEntity } from '@entities/mandat.entity';
import { MandatHistoryEntity } from '@entities/mandat.history.entity';
import { EventSubscriber } from 'typeorm';
import { HistorySubscriber } from 'typeorm-revisions';

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
}
