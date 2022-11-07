import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '.';
import { BonEngagementEntity } from './bon-engagement.entity';
import { TransmissionReceptionEntity } from './transmission-reception.entity';

@Entity({
  name: 'detail_transmission_reception',
})
export class DetailTransmissionReceptionEntity extends BaseEntity {
  @ManyToOne(() => BonEngagementEntity, (object) => object.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'bon_engagement_id' })
  public bon_engagement: BonEngagementEntity;

  @ManyToOne(() => TransmissionReceptionEntity, (object) => object.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'transmission_reception_id' })
  public transmission_reception: TransmissionReceptionEntity;

  constructor(param?: Partial<DetailTransmissionReceptionEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
